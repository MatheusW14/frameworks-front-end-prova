import Link from "next/link";
import { cursos } from "./data";

export default function CursosIndex() {
  return (
    <div>
      <h1>Catálogo de Cursos</h1>
      <p className="subtitulo">
        Unidades curriculares do curso de Tecnologia em Análise e Desenvolvimento de Sistemas.
      </p>

      <div className="grade">
        {cursos.map((curso) => (
          <Link key={curso.id} href={`/cursos/${curso.id}`} prefetch={true} className="cartao">
            <span className="selo">{curso.area}</span>
            <h2>{curso.titulo}</h2>
            <p>{curso.resumo}</p>
            <span className="carga">{curso.cargaHoraria}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
