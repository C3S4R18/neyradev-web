import { useCallback, useMemo, useState } from "react";
import { CURRENCIES, INITIAL_CURRENCY, storeCurrency } from "./config";
import { CurrencyContext } from "./context";

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState(INITIAL_CURRENCY);

  const changeCurrency = useCallback((code) => {
    if (!CURRENCIES[code]) return;
    setCurrency(code);
    storeCurrency(code);
  }, []);

  const value = useMemo(() => ({ currency, changeCurrency }), [currency, changeCurrency]);

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}
