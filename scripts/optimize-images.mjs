// Convierte las capturas de public/img-proyectos/ a WebP y actualiza las rutas
// en src/App.jsx. WebP pesa ~9 veces menos que PNG en capturas de interfaz
// (Esaf-logo: 7,2 MB -> 59 kB) y lo entiende cualquier navegador desde 2020.
//
//   npm run images            convierte lo pendiente
//   npm run images -- --dry   solo informa, no escribe
//
// Flujo al añadir capturas nuevas:
//   1. Deja los PNG/JPEG en public/img-proyectos/
//   2. Añádelos a la galería del proyecto en src/App.jsx con su extensión real
//   3. npm run images
// El script las convierte, borra el original y deja la ruta apuntando al .webp.
// Es idempotente: lo que ya es WebP no se toca.
//
// Las originales están en el historial de git. Para recuperarlas:
//   git checkout -- public/img-proyectos
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, unlinkSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, extname, basename } from "node:path";

// Solo borramos el original si git puede devolverlo. Un archivo sin seguimiento
// no tiene copia en ningún sitio: ahí conservamos el original junto al .webp.
const isTracked = (file) => {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", file], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
};

const DIR = "public/img-proyectos";
const APP = "src/App.jsx";
const MAX_EDGE = 1600; // de sobra para pantallas 2x
const DRY = process.argv.includes("--dry");

const kb = (n) => `${(n / 1024).toFixed(0)} kB`;

let before = 0;
let after = 0;
const rows = [];
const renames = [];
const kept = [];

for (const file of readdirSync(DIR).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const src = join(DIR, file);
  const target = join(DIR, `${basename(file, extname(file))}.webp`);
  const sizeBefore = statSync(src).size;

  const buffer = await sharp(src, { failOn: "none" })
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toBuffer();

  before += sizeBefore;
  after += buffer.length;
  rows.push({ file, before: sizeBefore, after: buffer.length });
  renames.push([`/img-proyectos/${file}`, `/img-proyectos/${basename(target)}`]);

  const tracked = isTracked(src);
  if (!tracked) kept.push(file);

  if (!DRY) {
    writeFileSync(target, buffer);
    if (tracked) unlinkSync(src);
  }
}

// --- FOTO DE PERFIL ---
//
// El original vive en assets-src/ (fuera de public/, así no se despliega) y de
// ahí salen todas las versiones. Si el script leyera y escribiera el mismo
// archivo, cada ejecución recortaría sobre lo ya recortado.
//
// Recorte cuadrado pensado para un retrato vertical tipo carnet: el lado mide
// el 84% del ancho y arranca al 5% de la altura. Así la cara queda centrada en
// el círculo con margen sobre el pelo. Un `fit: "cover"` a secas recorta por el
// centro geométrico, que en un retrato vertical cae en el pecho y decapita.
const PHOTO_SRC = "assets-src/mi-foto.png";
const photoBefore = statSync(PHOTO_SRC).size;

const meta = await sharp(PHOTO_SRC).metadata();
const side = Math.min(Math.round(meta.width * 0.84), meta.width, meta.height);
const cuadrado = sharp(PHOTO_SRC).extract({
  left: Math.round((meta.width - side) / 2),
  top: Math.min(Math.round(meta.height * 0.05), meta.height - side),
  width: side,
  height: side,
});

// La web usa WebP (18 kB frente a 86 kB en PNG para la misma foto).
const photoWebp = await cuadrado.clone().resize(512, 512).webp({ quality: 85 }).toBuffer();
if (!DRY) writeFileSync("public/mi-foto.webp", photoWebp);

// El favicon se queda en PNG por compatibilidad, y a 128 px basta.
const favicon = await cuadrado.clone().resize(128, 128).png({ compressionLevel: 9, palette: true, quality: 85, effort: 9 }).toBuffer();
if (!DRY) writeFileSync("public/mi-foto.png", favicon);

before += photoBefore;
after += photoWebp.length + favicon.length;
rows.push({ file: "mi-foto (webp+favicon)", before: photoBefore, after: photoWebp.length + favicon.length });

// Imagen para redes sociales: Open Graph pide 1200x630, no una foto cuadrada.
const avatar = await cuadrado.clone().resize(260, 260).png().toBuffer();
const card = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0420"/><stop offset="55%" stop-color="#1a0b3d"/><stop offset="100%" stop-color="#030014"/>
    </linearGradient>
    <clipPath id="round"><circle cx="290" cy="315" r="130"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="290" cy="315" r="138" fill="none" stroke="#a855f7" stroke-width="6"/>
  <image href="data:image/png;base64,${avatar.toString("base64")}" x="160" y="185" width="260" height="260" clip-path="url(#round)"/>
  <text x="480" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="66" font-weight="700" fill="#ffffff">César Neyra</text>
  <text x="480" y="335" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="#c084fc">Ingeniero de Software Full Stack</text>
  <text x="480" y="402" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#9ca3af">Next.js · Kotlin · Supabase · Sistemas escalables</text>
</svg>`;
const og = await sharp(Buffer.from(card)).png({ compressionLevel: 9 }).toBuffer();
if (!DRY) writeFileSync("public/og-image.png", og);
rows.push({ file: "og-image.png (nuevo)", before: 0, after: og.length });
after += og.length;

// Deja las rutas del código apuntando a los .webp.
let app = readFileSync(APP, "utf8");
let rewritten = 0;
for (const [from, to] of renames) {
  if (app.includes(from)) {
    app = app.replaceAll(from, to);
    rewritten += 1;
  }
}
if (!DRY && rewritten) writeFileSync(APP, app);

rows.sort((a, b) => b.before - a.before).slice(0, 10)
  .forEach((r) => console.log(`  ${r.file.padEnd(26)} ${kb(r.before).padStart(9)} -> ${kb(r.after).padStart(9)}`));

console.log(`\n${rows.length} imágenes: ${kb(before)} -> ${kb(after)} (-${Math.round((1 - after / before) * 100)}%)`);
console.log(`${rewritten} rutas actualizadas en ${APP}`);
if (kept.length) {
  console.log(`\nOriginal conservado (sin seguimiento en git, no habría copia): ${kept.join(", ")}`);
  console.log("Añádelo a git y vuelve a ejecutar si quieres que se borre.");
}
if (DRY) console.log("(--dry: no se ha escrito nada)");
