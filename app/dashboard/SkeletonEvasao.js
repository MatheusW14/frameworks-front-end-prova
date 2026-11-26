// Esqueleto exibido enquanto o Bloco B carrega.
export default function SkeletonEvasao() {
    return (
      <section className="dash-cartao" role="status" aria-busy="true" aria-label="Carregando relatório de evasão">
        <div className="dash-sk dash-sk-titulo" />
        <div className="dash-sk dash-sk-linha" />
        <div className="dash-sk dash-sk-linha" />
        <div className="dash-sk dash-sk-linha" />
        <div className="dash-sk dash-sk-linha curta" />
        <p className="dash-tempo">Carregando relatório histórico de evasão...</p>
      </section>
    );
  }