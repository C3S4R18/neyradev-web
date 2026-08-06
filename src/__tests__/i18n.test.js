import { describe, it, expect } from "vitest";
import { LANGUAGES, DEFAULT_LANG, langFromPath, pathForLang, urlForLang } from "../i18n/config";
import { loadLocale } from "../i18n/loaders";

// Las claves que App.jsx usa para enlazar cada bloque de datos con sus textos.
// Si alguien renombra una clave en un sitio y no en el otro, la interfaz pinta
// "undefined" y no se nota hasta que un visitante lo ve.
const PROJECT_KEYS = ["ruag", "jormard", "aldia", "esaf", "cinnamo", "led", "spin", "jornada", "ssoma", "cubo"];
const PLAN_KEYS = ["web", "app", "fullstack"];
const TIER_KEYS = ["webInfo", "webDyn", "webShop", "appBasic", "appInter", "appComplex", "fsStart", "fsPro", "fsEnterprise"];
const SERVICE_KEYS = ["backend", "mobile", "web"];
const BADGE_KEYS = ["current", "success", "personal", "corporate", "wip"];
const FILTER_KEYS = ["todos", "empresarial", "fullstack", "web", "movil"];

const locales = Object.fromEntries(
  await Promise.all(LANGUAGES.map(async (l) => [l.code, await loadLocale(l.code)]))
);

describe.each(LANGUAGES.map((l) => l.code))("idioma %s", (code) => {
  const t = locales[code];

  it("tiene los textos que pinta la portada", () => {
    expect(t.hero.roles.length).toBe(3);
    expect(t.hero.specialties.length).toBe(3);
    expect(t.nav.links.length).toBe(6);
    expect(t.seo.title).toBeTruthy();
    expect(t.seo.description.length).toBeGreaterThan(50);
  });

  it("cubre los 10 proyectos", () => {
    for (const key of PROJECT_KEYS) {
      expect(t.projects.items[key], `falta el proyecto ${key}`).toBeTruthy();
      expect(t.projects.items[key].subtitle).toBeTruthy();
    }
  });

  it("cubre planes, niveles, servicios, insignias y filtros", () => {
    for (const key of PLAN_KEYS) expect(t.pricing.categories[key].features.length).toBe(5);
    for (const key of TIER_KEYS) expect(t.pricing.tiers[key].features.length).toBe(5);
    for (const key of SERVICE_KEYS) expect(t.services.items[key].title).toBeTruthy();
    for (const key of BADGE_KEYS) expect(t.projects.badges[key]).toBeTruthy();
    for (const key of FILTER_KEYS) expect(t.projects.filters[key]).toBeTruthy();
  });

  it("conserva los marcadores que se rellenan en tiempo de ejecución", () => {
    expect(t.contact.form.subject).toContain("{name}");
    expect(t.pricing.headingDetail).toContain("{category}");
    for (const key of TIER_KEYS) {
      expect(t.pricing.tiers[key].whatsappMsg, `${key} sin {price}`).toContain("{price}");
    }
  });

  it("no deja ningún texto vacío", () => {
    const vacios = [];
    const recorrer = (valor, ruta) => {
      if (typeof valor === "string") {
        if (!valor.trim()) vacios.push(ruta);
      } else if (Array.isArray(valor)) {
        valor.forEach((v, i) => recorrer(v, `${ruta}[${i}]`));
      } else if (valor && typeof valor === "object") {
        Object.entries(valor).forEach(([k, v]) => recorrer(v, `${ruta}.${k}`));
      }
    };
    recorrer(t, code);
    expect(vacios).toEqual([]);
  });
});

describe("rutas por idioma", () => {
  it("el idioma por defecto va sin prefijo", () => {
    expect(pathForLang(DEFAULT_LANG)).toBe("/");
    expect(urlForLang(DEFAULT_LANG)).toMatch(/\/$/);
  });

  it("el resto lleva prefijo", () => {
    expect(pathForLang("fr")).toBe("/fr/");
    expect(pathForLang("eu")).toBe("/eu/");
  });

  it("lee el idioma de la ruta", () => {
    expect(langFromPath("/fr/")).toBe("fr");
    expect(langFromPath("/de/algo")).toBe("de");
    expect(langFromPath("/")).toBe(null);
    expect(langFromPath("/proyectos")).toBe(null);
    expect(langFromPath("/zz/")).toBe(null);
  });
});
