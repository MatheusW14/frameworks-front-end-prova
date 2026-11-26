import { buscarRelatorioEvasao } from "./data";

// Server Component assíncrono: é ele que espera os 3 segundos,
// e não a página. Por isso o Suspense consegue enviar o resto antes.
export default async function BlocoEvasao() {
  const relatorio = await buscarRelatorioEvasao();
  const maior = Math.max(...relatorio.periodos.map((p) => p.taxa));

  return (
    <section className="dash-cartao" aria-labelledby="titulo-b">
      <h2 id="titulo-b">Bloco B · Relatório histórico de evasão</h2>
      <ul className="dash-barras">
        {relatorio.periodos.map((p) => (
          <li key={p.periodo}>
            <span className="dash-barra-rotulo">{p.periodo}</span>
            <span className="dash-barra-trilho">
              <span className="dash-barra" style={{ width: `${(p.taxa / maior) * 100}%` }} />
            </span>
            <span className="dash-barra-valor">{p.taxa.toLocaleString("pt-BR")}%</span>
          </li>
        ))}
      </ul>
      <p className="dash-tempo">Carregado em {relatorio.tempoMs} ms</p>
    </section>
  );
}