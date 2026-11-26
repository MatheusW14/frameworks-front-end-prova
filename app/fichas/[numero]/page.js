import fs from "node:fs/promises";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { questoes } from "../../lib/prova";
import { caminhoFicha, questaoDisponivel } from "../../lib/status";
import BotaoImprimir from "./BotaoImprimir";

export const dynamic = "force-dynamic"; // lê o arquivo da ficha a cada acesso

export default async function FichaPage({ params }) {
  const { numero } = await params;
  const questao = questoes.find((q) => String(q.numero) === numero);

  if (!questao) {
    notFound();
  }

  let html = null;
  try {
    const markdown = await fs.readFile(caminhoFicha(questao.numero), "utf8");
    html = await marked.parse(markdown, { gfm: true });
  } catch {
    html = null; // arquivo ainda não existe
  }

  return (
    <main className="ficha-pagina">
      <div className="ficha-acoes">
        <Link href="/">← Painel da prova</Link>
        {questaoDisponivel(questao.rota) && (
          <Link href={questao.rota}>Abrir a Questão {questao.numero}</Link>
        )}
        {html && <BotaoImprimir />}
      </div>

      {html ? (
        <article className="ficha" dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <article className="ficha">
          <h1>Ficha da Questão {questao.numero}</h1>
          <p>A ficha de documentação de uso de IA desta questão ainda não está disponível.</p>
        </article>
      )}
    </main>
  );
}
