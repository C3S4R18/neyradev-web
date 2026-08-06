// Genera una página HTML por idioma después del build.
//
// El problema que resuelve: la web decide el idioma en JavaScript, así que
// Google solo veía una versión y las otras ocho traducciones no existían para
// el buscador. Ahora cada idioma tiene su dirección ("/", "/en/", "/fr/"…) con
// su <html lang>, su título, su descripción y las etiquetas `hreflang` que
// relacionan las nueve entre sí.
//
// También escribe robots.txt, sitemap.xml y los datos estructurados JSON-LD.
//
// Se ejecuta solo tras `npm run build` (ver el script `build` en package.json).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { LANGUAGES, SITE_URL, DEFAULT_LANG, pathForLang, urlForLang } from "../src/i18n/config.js";
import { SOCIAL_LINKS } from "../src/data/social.js";

const DIST = "dist";
const template = readFileSync(join(DIST, "index.html"), "utf8");

const locales = Object.fromEntries(
  await Promise.all(
    LANGUAGES.map(async (l) => [l.code, (await import(`../src/i18n/locales/${l.code}.js`)).default])
  )
);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// `hreflang` le dice a Google que son la misma página en distintos idiomas, no
// contenido duplicado. `x-default` marca a dónde mandar al resto del mundo.
const alternates = [
  ...LANGUAGES.map((l) => `    <link rel="alternate" hreflang="${l.code}" href="${urlForLang(l.code)}" />`),
  `    <link rel="alternate" hreflang="x-default" href="${urlForLang(DEFAULT_LANG)}" />`,
].join("\n");

const jsonLd = (t) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Person",
    name: "César Neyra",
    jobTitle: t.hero.roles[0],
    description: t.seo.description,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    email: "mailto:neyrajcf@gmail.com",
    sameAs: [SOCIAL_LINKS.github, SOCIAL_LINKS.linkedin, SOCIAL_LINKS.instagram],
    knowsAbout: ["Next.js", "React", "TypeScript", "Kotlin", "Android", "Supabase", "PostgreSQL", "Node.js"],
    worksFor: { "@type": "Organization", name: "Ruag S.A.C." },
    knowsLanguage: LANGUAGES.map((l) => l.code),
  });

for (const { code } of LANGUAGES) {
  const t = locales[code];
  const url = urlForLang(code);
  let html = template;

  html = html.replace('<html lang="es">', `<html lang="${code}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(t.seo.title)}</title>`);
  html = html.replace(
    /(<meta name="description" content=")[^"]*(")/,
    `$1${esc(t.seo.description)}$2`
  );

  // Cada idioma es canónico de sí mismo; si no, Google los trata como copias.
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = html.replace(/(<meta property="og:locale" content=")[^"]*(")/, `$1${code}$2`);
  html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(t.seo.title)}$2`);
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${esc(t.seo.description)}$2`
  );
  html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(t.seo.title)}$2`);
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${esc(t.seo.description)}$2`
  );

  html = html.replace(
    "</head>",
    `${alternates}\n    <script type="application/ld+json">${jsonLd(t)}</script>\n  </head>`
  );

  const dir = code === DEFAULT_LANG ? DIST : join(DIST, code);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

writeFileSync(
  join(DIST, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
);

const today = new Date().toISOString().slice(0, 10);
const urls = LANGUAGES.map(({ code }) => {
  const links = LANGUAGES.map(
    (l) => `    <xhtml:link rel="alternate" hreflang="${l.code}" href="${urlForLang(l.code)}"/>`
  ).join("\n");
  return `  <url>
    <loc>${urlForLang(code)}</loc>
    <lastmod>${today}</lastmod>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${urlForLang(DEFAULT_LANG)}"/>
  </url>`;
}).join("\n");

writeFileSync(
  join(DIST, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
);

console.log(
  `${LANGUAGES.length} páginas (${LANGUAGES.map((l) => pathForLang(l.code)).join(" ")}), robots.txt y sitemap.xml`
);
