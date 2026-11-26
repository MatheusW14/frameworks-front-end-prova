import "./dashboard.css";
import { Suspense } from "react";
import Link from "next/link";
import { buscarMetricasRapidas } from "./data";
import BlocoEvasao from "./BlocoEvasao";
import SkeletonEvasao from "./SkeletonEvasao";

// Sem isso, o Next poderia gerar a página estática no build e servi-la pronta,
// escondendo o atraso e o streaming. Aqui queremos renderizar a cada requisição.
export const dynamic = "force-dynamic";

export const metadata = { title: "Dashboard Acadêmico · Prova" };

// Server Component assíncrono: espera apenas o Bloco A (500 ms).
export default async function DashboardPage() {
  const metricas = await buscarMetricasRapidas();

  return (
    <main className="dash-pagina">
      <div className="dash-conteudo">
        <Link href="/">← Painel da prova</Link>
        <h1>Dashboard Analítico Acadêmico</h1>
        <p className="dash-sub">
          Os blocos abaixo vêm de fontes com tempos de resposta diferentes e aparecem por partes.
        </p>

        {/* Bloco A: métricas rápidas */}
        <section className="dash-cartao" aria-labelledby="titulo-a">
          <h2 id="titulo-a">Bloco A · Métricas rápidas</h2>
          <div className="dash-metricas">
            <div className="dash-metrica">
              <span className="dash-valor">{metricas.alunosAtivos.toLocaleString("pt-BR")}</span>
              <span className="dash-rotulo">Alunos ativos</span>
            </div>
            <div className="dash-metrica">
              <span className="dash-valor">{metricas.turmas}</span>
              <span className="dash-rotulo">Turmas</span>
            </div>
            <div className="dash-metrica">
              <span className="dash-valor">{metricas.aprovacaoGeral.toLocaleString("pt-BR")}%</span>
              <span className="dash-rotulo">Aprovação geral</span>
            </div>
          </div>
          <p className="dash-tempo">Carregado em {metricas.tempoMs} ms</p>
        </section>

        {/* Bloco B: isolado em um limite de Suspense, não bloqueia o Bloco A */}
        <Suspense fallback={<SkeletonEvasao />}>
          <BlocoEvasao />
        </Suspense>
      </div>
    </main>
  );
}