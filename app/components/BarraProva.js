"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { questoes, parteObjetiva } from "../lib/prova";

export default function BarraProva() {
  const pathname = usePathname() ?? "/";

  const questaoAtual = questoes.find(
    (q) => pathname === q.rota || pathname.startsWith(`${q.rota}/`)
  );
  const numeroFicha = pathname.startsWith("/fichas/") ? pathname.split("/")[2] : null;
  const questaoDaFicha = questoes.find((q) => String(q.numero) === numeroFicha);

  return (
    <header className="barra-prova">
      <Link href="/" className="barra-marca">Prova · Frameworks Front-end</Link>

      {questaoAtual && (
        <span className="barra-questao">Questão {questaoAtual.numero} · {questaoAtual.titulo}</span>
      )}
      {questaoDaFicha && (
        <span className="barra-questao">Ficha de IA · Questão {questaoDaFicha.numero}</span>
      )}
      {pathname === parteObjetiva.rota && (
        <span className="barra-questao">Parte I · {parteObjetiva.titulo}</span>
      )}
      <span className="barra-espaco" />

      <Link href="/" className="barra-link">Painel</Link>
      {questaoAtual && (
        <Link href={`/fichas/${questaoAtual.numero}`} prefetch={true} className="barra-link destaque">
          Ficha de IA
        </Link>
      )}
    </header>
  );
}
