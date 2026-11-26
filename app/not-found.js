import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
      <h1>Página não encontrada</h1>
      <p><Link href="/">← Voltar ao painel da prova</Link></p>
    </main>
  );
}
