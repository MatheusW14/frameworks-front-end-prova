import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <h1>Catálogo Acadêmico</h1>
      <p>
        Consulte as unidades curriculares do curso de Tecnologia em Análise e Desenvolvimento de
        Sistemas (TADS) do IFMS, Campus Três Lagoas.
      </p>
      <Link href="/cursos" prefetch={true} className="botao">Acessar o catálogo de cursos</Link>
    </main>
  );
}
