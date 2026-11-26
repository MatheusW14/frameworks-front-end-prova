"use client";

export default function BotaoImprimir() {
  return (
    <button type="button" onClick={() => window.print()}>
      Imprimir / salvar em PDF
    </button>
  );
}
