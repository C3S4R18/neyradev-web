// Comprueba que los 9 idiomas tengan exactamente las mismas claves que es.js
// y que ningún texto esté vacío. Se ejecuta con: npm run check:locales
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const localesDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "i18n", "locales");
const REFERENCE = "es";

// Aplana el objeto a una lista de rutas: "hero.stats.years", "nav.links[0]"...
function paths(value, prefix = "") {
  if (Array.isArray(value)) {
    return value.flatMap((item, i) => paths(item, `${prefix}[${i}]`));
  }
  if (value && typeof value === "object") {
    return Object.entries(value).flatMap(([key, val]) =>
      paths(val, prefix ? `${prefix}.${key}` : key)
    );
  }
  return [{ path: prefix, value }];
}

const files = readdirSync(localesDir).filter((f) => f.endsWith(".js"));
const locales = {};
for (const file of files) {
  const code = file.replace(/\.js$/, "");
  locales[code] = (await import(new URL(`file://${join(localesDir, file)}`))).default;
}

const reference = paths(locales[REFERENCE]);
const referenceKeys = new Set(reference.map((entry) => entry.path));

let failures = 0;
const report = (message) => {
  console.error(`  ✗ ${message}`);
  failures += 1;
};

for (const [code, locale] of Object.entries(locales)) {
  if (code === REFERENCE) continue;

  const entries = paths(locale);
  const keys = new Set(entries.map((entry) => entry.path));

  for (const key of referenceKeys) {
    if (!keys.has(key)) report(`${code}: falta "${key}"`);
  }
  for (const key of keys) {
    if (!referenceKeys.has(key)) report(`${code}: sobra "${key}" (no está en ${REFERENCE})`);
  }
  for (const { path, value } of entries) {
    if (typeof value !== "string" || value.trim() === "") {
      report(`${code}: "${path}" está vacío o no es texto`);
    }
  }
}

// Marcadores como {name} o {category} deben sobrevivir a la traducción.
for (const { path, value } of reference) {
  const tokens = String(value).match(/\{\w+\}/g);
  if (!tokens) continue;
  for (const [code, locale] of Object.entries(locales)) {
    const translated = String(
      path.split(/\.|\[|\]/).filter(Boolean).reduce((acc, key) => acc?.[key], locale)
    );
    for (const token of tokens) {
      if (!translated.includes(token)) report(`${code}: "${path}" perdió el marcador ${token}`);
    }
  }
}

// Las claves que App.jsx usa para enlazar (PROJECTS_META, PRICING_META...)
// deben existir en los locales, o la interfaz renderiza `undefined`.
const appSource = readFileSync(join(localesDir, "..", "..", "App.jsx"), "utf8");

const keysIn = (blockName) => {
  const start = appSource.indexOf(`const ${blockName} = [`);
  if (start === -1) return [];
  const end = appSource.indexOf("\n];", start);
  return [...appSource.slice(start, end).matchAll(/^\s*(?:\{\s*)?key: "(\w+)"/gm)].map((m) => m[1]);
};

const crossChecks = [
  ["SERVICES_META", (l) => l.services.items],
  ["PROJECTS_META", (l) => l.projects.items],
  ["TESTIMONIALS_META", (l) => l.testimonials.items],
  ["TIMELINE_META", (l) => l.timeline.items],
];

for (const [blockName, pick] of crossChecks) {
  const used = keysIn(blockName);
  if (used.length === 0) report(`no se pudo leer ${blockName} en App.jsx`);
  for (const key of used) {
    if (!pick(locales[REFERENCE])[key]) report(`${blockName}: la clave "${key}" no existe en ${REFERENCE}`);
  }
}

// PRICING_META mezcla categorías y niveles: van a ramas distintas del locale.
const pricingKeys = keysIn("PRICING_META");
const pricingRef = locales[REFERENCE].pricing;
for (const key of pricingKeys) {
  if (!pricingRef.categories[key] && !pricingRef.tiers[key]) {
    report(`PRICING_META: la clave "${key}" no existe ni en pricing.categories ni en pricing.tiers de ${REFERENCE}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} problema(s) en los locales.`);
  process.exit(1);
}
console.log(`✓ ${Object.keys(locales).length} idiomas, ${referenceKeys.size} claves, todas coinciden.`);
