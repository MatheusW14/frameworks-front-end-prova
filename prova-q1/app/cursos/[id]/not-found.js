import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>Curso não encontrado</h1>
      <p>O ID informado não existe no catálogo.</p>
      <p>
        <Link href="/cursos">← Ver todos os cursos</Link> ou <Link href="/">voltar ao início</Link>
      </p>
    </div>
  );
}
