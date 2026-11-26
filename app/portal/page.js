import Link from "next/link";
import BarraAcessibilidade from "./BarraAcessibilidade";
import { listarComunicados } from "./comunicados.service";

export const metadata = { title: "Portal de Comunicados · Prova" };

function formatarData(iso) {
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Server Component assíncrono: consulta os dados no servidor, pelo módulo protegido.
export default async function PortalPage() {
  const comunicados = await listarComunicados();

  return (
    <main className="portal-pagina">
      <div className="portal-conteudo">
        <Link href="/">← Painel da prova</Link>
        <h1>Portal de Comunicados do IFMS</h1>

        {/* Topo: barra de acessibilidade (Client Component, consome o contexto) */}
        <BarraAcessibilidade />

        {/* Abaixo: mural gerado no servidor (Server Component) */}
        <section aria-labelledby="titulo-mural">
          <h2 id="titulo-mural">Mural de avisos</h2>
          <ul className="portal-mural">
            {comunicados.map((c) => (
              <li key={c.id} className="portal-aviso">
                <div className="portal-aviso-topo">
                  <span className={`portal-chip ${c.prioridade === "Urgente" ? "urgente" : ""}`}>
                    {c.prioridade}
                  </span>
                  <strong>{c.titulo}</strong>
                </div>
                <p>{c.texto}</p>
                <p className="portal-meta">{c.setor} · {formatarData(c.data)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
