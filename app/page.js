import Link from "next/link";
import { prova, questoes, parteObjetiva } from "./lib/prova";
import { questaoDisponivel, fichaDisponivel } from "./lib/status";

export const dynamic = "force-dynamic"; // reflete na hora o que já existe em disco

export default function Painel() {
  return (
    <main className="painel">
      <header className="painel-topo">
        <p className="painel-selo">Avaliação teórico-prática · 2026</p>
        <h1>{prova.disciplina}</h1>
        <p className="painel-sub">
          Cinco questões práticas em Next.js (App Router). Cada questão tem a sua página e a ficha
          de documentação de uso de IA correspondente.
        </p>
        <dl className="painel-meta">
          <div><dt>Estudante</dt><dd>{prova.estudante}</dd></div>
          <div><dt>R.A.</dt><dd>{prova.ra}</dd></div>
          <div><dt>Curso</dt><dd>{prova.curso}</dd></div>
          <div><dt>Instituição</dt><dd>{prova.instituicao}</dd></div>
        </dl>
      </header>

      <section className="painel-grade" aria-label="Questões da prova">
      <article className="painel-card">
          <div className="painel-num">{parteObjetiva.rotulo}</div>
          <div className="painel-corpo">
            <div className="painel-titulo">
              <h2>{parteObjetiva.titulo}</h2>
              <span className="estado ok">Disponível</span>
            </div>
            <p>{parteObjetiva.descricao}</p>
            <ul className="chips">
              {parteObjetiva.conceitos.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <div className="painel-acoes">
              <Link href={parteObjetiva.rota} prefetch={true} className="btn btn-primario">Abrir questões</Link>
            </div>
          </div>
        </article>
        {questoes.map((q) => {
          const disponivel = questaoDisponivel(q.rota);
          const ficha = fichaDisponivel(q.numero);
          return (
            <article key={q.numero} className={`painel-card ${disponivel ? "" : "indisponivel"}`}>
              <div className="painel-num">{q.numero}</div>
              <div className="painel-corpo">
                <div className="painel-titulo">
                  <h2>{q.titulo}</h2>
                  <span className={`estado ${disponivel ? "ok" : ""}`}>
                    {disponivel ? "Disponível" : "Em breve"}
                  </span>
                </div>
                <p>{q.descricao}</p>
                <ul className="chips">
                  {q.conceitos.map((c) => <li key={c}>{c}</li>)}
                </ul>
                <div className="painel-acoes">
                  {disponivel ? (
                    <Link href={q.rota} prefetch={true} className="btn btn-primario">Abrir questão</Link>
                  ) : (
                    <span className="btn btn-desativado">Questão pendente</span>
                  )}
                  {ficha ? (
                    <Link href={`/fichas/${q.numero}`} prefetch={true} className="btn btn-secundario">
                      Ficha de IA
                    </Link>
                  ) : (
                    <span className="btn btn-desativado">Ficha pendente</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}