// --- PRECIOS POR PAÍS ---
//
// El precio base está en soles (PEN) y se convierte al vuelo. Ojo con dos cosas:
//
// 1. Las tasas son APROXIMADAS y están fijadas a mano. No hay API de cambio:
//    una web estática no debería depender de un servicio externo para pintar
//    su tabla de precios. Revísalas cada cierto tiempo (ver RATES abajo).
// 2. Lo que se muestra es orientativo. El importe que factures se acuerda en
//    la conversación; por eso la web enseña la nota `pricing.approxNote`
//    siempre que la moneda no sea PEN.

export const STORAGE_KEY = "neyradev:currency";

// Tasas revisadas por última vez: 2026-08. `rate` es el cambio: 1 PEN = X.
//
// `market` es un ajuste APARTE del cambio, y es una decisión comercial, no
// financiera: el mismo trabajo se cotiza más caro en mercados con tarifas más
// altas. Se mantiene separado de `rate` para que al actualizar el tipo de
// cambio no se pise la política de precios (y al revés).
//   1.0 = precio equivalente al peruano.  1.4 = un 40% por encima.
// Es el único número que hay que tocar para subir o bajar un mercado.
//
// `display: "code"` para el peso mexicano y el dólar canadiense: su símbolo es
// "$" y en una página que también muestra dólares estadounidenses eso se
// confunde. Con el código delante ("MXN 3.000") no hay duda.
export const CURRENCIES = {
  PEN: { code: "PEN", rate: 1, market: 1, locale: "es-PE", step: 50 },
  EUR: { code: "EUR", rate: 0.24, market: 1.4, locale: "de-DE", step: 10 },
  USD: { code: "USD", rate: 0.27, market: 1, locale: "en-US", step: 10 },
  GBP: { code: "GBP", rate: 0.21, market: 1, locale: "en-GB", step: 10 },
  CHF: { code: "CHF", rate: 0.22, market: 1, locale: "de-CH", step: 10 },
  CAD: { code: "CAD", rate: 0.37, market: 1, locale: "en-CA", step: 10, display: "code" },
  MXN: { code: "MXN", rate: 5.0, market: 1, locale: "es-MX", step: 100, display: "code" },
  BRL: { code: "BRL", rate: 1.5, market: 1, locale: "pt-BR", step: 50 },
};

export const DEFAULT_CURRENCY = "USD";

const EUROZONE = ["ES", "FR", "DE", "IT", "PT", "NL", "BE", "AT", "IE", "FI", "GR", "SK", "SI", "LT", "LV", "EE", "LU", "CY", "MT", "HR"];

const REGION_TO_CURRENCY = {
  PE: "PEN",
  GB: "GBP",
  US: "USD",
  CH: "CHF",
  CA: "CAD",
  MX: "MXN",
  BR: "BRL",
  // Países con moneda muy volátil o economía dolarizada: mostramos USD, que es
  // como se cotiza el software allí de todas formas.
  AR: "USD", CL: "USD", CO: "USD", EC: "USD", BO: "USD", UY: "USD", PY: "USD", VE: "USD",
  ...Object.fromEntries(EUROZONE.map((r) => [r, "EUR"])),
};

// Complemento cuando el idioma del navegador no trae región ("es" a secas).
const TIMEZONE_HINTS = [
  ["America/Lima", "PEN"],
  ["Europe/London", "GBP"],
  ["Europe/Zurich", "CHF"],
  ["America/Mexico", "MXN"],
  ["America/Sao_Paulo", "BRL"],
  ["Europe/", "EUR"],
  ["America/Toronto", "CAD"],
  ["America/Vancouver", "CAD"],
];

export function detectCurrency() {
  const prefs =
    typeof navigator !== "undefined" && navigator.languages?.length
      ? navigator.languages
      : [typeof navigator !== "undefined" ? navigator.language : ""];

  for (const pref of prefs) {
    // "es-ES" -> "ES"; ignoramos etiquetas sin región como "es" a secas.
    const region = String(pref || "").split("-")[1]?.toUpperCase();
    if (region && REGION_TO_CURRENCY[region]) return REGION_TO_CURRENCY[region];
  }

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    const hit = TIMEZONE_HINTS.find(([prefix]) => tz.startsWith(prefix));
    if (hit) return hit[1];
  } catch {
    // Intl sin zona horaria: seguimos al valor por defecto.
  }

  return DEFAULT_CURRENCY;
}

export function readStoredCurrency() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved && CURRENCIES[saved] ? saved : null;
  } catch {
    return null;
  }
}

export function storeCurrency(code) {
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Sin persistencia: la elección dura lo que dure la pestaña.
  }
}

// Redondea a una cifra "de tarifa": 144 -> 140, no 144,37. El escalón crece con
// el importe, porque "1.010 €" no parece un precio y "1.000 €" sí.
function roundToStep(value, minStep) {
  const step = Math.max(minStep, value < 500 ? 10 : value < 2000 ? 50 : 100);
  return Math.max(step, Math.round(value / step) * step);
}

/** Convierte un precio base en soles y lo formatea en la moneda indicada. */
export function formatPrice(basePEN, code) {
  const currency = CURRENCIES[code] ?? CURRENCIES[DEFAULT_CURRENCY];
  const converted = Number(basePEN) * currency.rate * (currency.market ?? 1);
  const amount = roundToStep(converted, currency.step);

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    currencyDisplay: currency.display ?? "symbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const STORED_CURRENCY = readStoredCurrency();
export const INITIAL_CURRENCY = STORED_CURRENCY ?? detectCurrency();
