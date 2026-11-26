import "./ouvidoria.css";
import Link from "next/link";
import FormularioOuvidoria from "./FormularioOuvidoria";
import { listarManifestacoes } from "./store";

export const metadata = { title: "Ouvidoria Acadêmica · Prova" };

function formatarData(iso) {
  return new Date(iso).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  });
}

// Server Component: lê o repositório no servidor. O revalidatePath da Server Action
// faz esta página ser renderizada de novo com a lista atualizada.
export default function OuvidoriaPage() {
  const manifestacoes = listarManifestacoes();

  return (
    <main className="ouv-pagina">
      <div className="ouv-conteudo">
        <Link href="/">← Painel da prova</Link>
        <h1>Ouvidoria Acadêmica</h1>
        <p className="ouv-sub">
          Envie um elogio, sugestão ou reclamação. A manifestação aparece no mural logo após o envio.
        </p>

        <section className="ouv-cartao" aria-labelledby="titulo-form">
          <h2 id="titulo-form">Nova manifestação</h2>
          <FormularioOuvidoria />
        </section>

        <section className="ouv-cartao" aria-labelledby="titulo-mural">
          <h2 id="titulo-mural">Mural público</h2>
          <p className="ouv-contagem">{manifestacoes.length} manifestação(ões) registrada(s).</p>
          <ul className="ouv-mural">
            {manifestacoes.map((m) => (
              <li key={m.id} className="ouv-item">
                <div className="ouv-item-topo">
                  <span className={`ouv-chip tipo-${m.tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                    {m.tipo}
                  </span>
                  <strong>{m.nome}</strong>
                  <span className="ouv-data">{formatarData(m.criadoEm)}</span>
                </div>
                <p>{m.mensagem}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}