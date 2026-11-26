"use client";

import { createContext, useContext, useMemo, useState } from "react";

export const AcessibilidadeContext = createContext(null);

// Recebe `children` (padrão de composição): o que for passado aqui dentro
// continua sendo Server Component, porque já chega renderizado pelo servidor.
export function AcessibilidadeProvider({ children }) {
  const [altoContraste, setAltoContraste] = useState(false);
  const [fonteAmpliada, setFonteAmpliada] = useState(false);

  const valor = useMemo(
    () => ({
      altoContraste,
      fonteAmpliada,
      alternarContraste: () => setAltoContraste((v) => !v),
      alternarFonte: () => setFonteAmpliada((v) => !v),
    }),
    [altoContraste, fonteAmpliada]
  );

  return (
    <AcessibilidadeContext.Provider value={valor}>
      <div
        className="portal-raiz"
        data-contraste={altoContraste ? "alto" : "normal"}
        data-fonte={fonteAmpliada ? "ampliada" : "normal"}
      >
        {children}
      </div>
    </AcessibilidadeContext.Provider>
  );
}

export function useAcessibilidade() {
  const contexto = useContext(AcessibilidadeContext);
  if (!contexto) {
    throw new Error("useAcessibilidade deve ser usado dentro de <AcessibilidadeProvider>.");
  }
  return contexto;
}