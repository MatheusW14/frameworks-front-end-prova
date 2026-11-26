"use client";

import { useAcessibilidade } from "../providers";

// Único Client Component da página: consome o contexto e oferece os botões.
export default function BarraAcessibilidade() {
  const { altoContraste, fonteAmpliada, alternarContraste, alternarFonte } = useAcessibilidade();

  return (
    <div className="portal-barra" role="toolbar" aria-label="Ferramentas de acessibilidade">
      <span className="portal-barra-titulo">Acessibilidade</span>
      <button type="button" onClick={alternarContraste} aria-pressed={altoContraste}>
        Alto contraste: {altoContraste ? "ativo" : "inativo"}
      </button>
      <button type="button" onClick={alternarFonte} aria-pressed={fonteAmpliada}>
        Fonte: {fonteAmpliada ? "ampliada" : "normal"}
      </button>
    </div>
  );
}