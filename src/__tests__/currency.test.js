import { describe, it, expect } from "vitest";
import { CURRENCIES, formatPrice, detectCurrency, DEFAULT_CURRENCY } from "../currency/config";

const PRECIOS_BASE = [600, 800, 1200, 1500, 1800, 2500, 3000, 3500, 5500];

describe("precios", () => {
  it.each(Object.keys(CURRENCIES))("%s formatea todos los precios sin decimales", (code) => {
    for (const base of PRECIOS_BASE) {
      const salida = formatPrice(base, code);
      expect(salida).toBeTruthy();
      // Nada de "1.234,56": una tarifa no lleva céntimos.
      expect(salida).not.toMatch(/[.,]\d{2}\b/);
      // Y siempre debe quedar algún número visible.
      expect(salida).toMatch(/\d/);
    }
  });

  it("el sol es la moneda base y no se convierte", () => {
    expect(formatPrice(600, "PEN")).toContain("600");
    expect(formatPrice(1500, "PEN")).toContain("500");
  });

  it("el euro aplica el ajuste de mercado", () => {
    // 600 * 0.24 * 1.4 = 201,6 -> 200
    expect(formatPrice(600, "EUR")).toMatch(/200/);
    expect(CURRENCIES.EUR.market).toBeGreaterThan(1);
  });

  it("los precios crecen igual que la base", () => {
    for (const code of Object.keys(CURRENCIES)) {
      const num = (s) => Number(String(s).replace(/[^\d]/g, ""));
      const valores = PRECIOS_BASE.map((p) => num(formatPrice(p, code)));
      for (let i = 1; i < valores.length; i++) {
        expect(valores[i], `${code}: ${PRECIOS_BASE[i]} no supera a ${PRECIOS_BASE[i - 1]}`)
          .toBeGreaterThanOrEqual(valores[i - 1]);
      }
    }
  });

  it("una moneda desconocida cae en la de por defecto", () => {
    expect(formatPrice(600, "XXX")).toBe(formatPrice(600, DEFAULT_CURRENCY));
  });

  it("la detección devuelve siempre una moneda soportada", () => {
    expect(Object.keys(CURRENCIES)).toContain(detectCurrency());
  });
});
