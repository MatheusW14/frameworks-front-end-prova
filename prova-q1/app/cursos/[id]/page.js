import { notFound } from "next/navigation";
import { cursos } from "../data";

// Server Component assíncrono
export default async function CursoPage({ params }) {
  const { id } = await params; // params é uma Promise no Next 15+

  const curso = cursos.find((c) => String(c.id) === id);

  if (!curso) {
    notFound();
  }

  return (
    <article>
      <h1>{curso.titulo}</h1>
      <p><strong>Carga horária:</strong> {curso.cargaHoraria}</p>

      <h2>Ementa</h2>
      <p>{curso.ementa}</p>

      <h2>Pré-requisitos</h2>
      <ul>
        {curso.preRequisitos.map((req) => (
          <li key={req}>{req}</li>
        ))}
      </ul>
    </article>
  );
}
