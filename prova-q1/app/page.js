import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "1.5rem" }}>
      <h1>Catálogo Acadêmico</h1>
      <Link href="/cursos">Ir para o catálogo de cursos</Link>
    </main>
  );
}
