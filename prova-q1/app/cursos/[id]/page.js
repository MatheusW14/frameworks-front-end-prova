import Link from "next/link";
import { notFound } from "next/navigation";
import { cursos } from "../data";

// Server Component assíncrono
export default async function CursoPage({ params }) {
  const { id } = await params; // params é uma Promise no Next 15+

  const indice = cursos.findIndex((c) => String(c.id) === id);

  if (indice === -1) {
    notFound();
  }

  const curso = cursos[indice];
  const anterior = cursos[indice - 1];
  const proximo = cursos[indice + 1];

  return (
    <article>
      <nav aria-label="Trilha de navegação" className="trilha">
        <Link href="/">Início</Link> / <Link href="/cursos">Cursos</Link> / <span>{curso.titulo}</span>
      </nav>

      <h1>{curso.titulo}</h1>
      <div className="selos">
        <span className="selo">{curso.area}</span>
        <span className="selo">Carga horária: {curso.cargaHoraria}</span>
      </div>

      <h2>Ementa</h2>
      <p>{curso.ementa}</p>

      <h2>Objetivos de aprendizagem</h2>
      <ul>
        {curso.objetivos.map((o) => <li key={o}>{o}</li>)}
      </ul>

      <h2>Tópicos abordados</h2>
      <ul>
        {curso.topicos.map((t) => <li key={t}>{t}</li>)}
      </ul>

      <h2>Pré-requisitos</h2>
      <ul>
        {curso.preRequisitos.map((req) => {
          const cursoReq = cursos.find((c) => c.titulo === req);
          return (
            <li key={req}>
              {cursoReq ? (
                <Link href={`/cursos/${cursoReq.id}`} prefetch={true}>{req}</Link>
              ) : (
                req
              )}
            </li>
          );
        })}
      </ul>

      <nav aria-label="Navegação entre cursos" className="anterior-proximo">
        {anterior ? (
          <Link href={`/cursos/${anterior.id}`} prefetch={true}>← {anterior.titulo}</Link>
        ) : <span />}
        {proximo ? (
          <Link href={`/cursos/${proximo.id}`} prefetch={true}>{proximo.titulo} →</Link>
        ) : <span />}
      </nav>
    </article>
  );
}
