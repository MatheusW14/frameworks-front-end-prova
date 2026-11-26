import "./dashboard.css";

// Exibido automaticamente pelo Next.js assim que /dashboard é requisitada,
// enquanto a página espera o Bloco A.
export default function Loading() {
  return (
    <main className="dash-pagina">
      <div className="dash-conteudo" role="status" aria-busy="true" aria-label="Carregando o dashboard">
        <div className="dash-sk dash-sk-titulo" style={{ width: "50%", height: "2rem" }} />
        <div className="dash-sk dash-sk-linha" style={{ width: "70%", margin: "0.75rem 0 1.5rem" }} />
        <section className="dash-cartao">
          <div className="dash-sk dash-sk-titulo" />
          <div className="dash-metricas">
            <div className="dash-sk dash-sk-metrica" />
            <div className="dash-sk dash-sk-metrica" />
            <div className="dash-sk dash-sk-metrica" />
          </div>
        </section>
        <section className="dash-cartao">
          <div className="dash-sk dash-sk-titulo" />
          <div className="dash-sk dash-sk-linha" />
          <div className="dash-sk dash-sk-linha" />
          <div className="dash-sk dash-sk-linha curta" />
        </section>
        <p className="dash-tempo">Carregando dashboard...</p>
      </div>
    </main>
  );
}