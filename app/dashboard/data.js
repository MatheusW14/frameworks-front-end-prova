// Simulação de fontes de dados com tempos de resposta diferentes.
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Bloco A: consulta rápida (500 ms)
export async function buscarMetricasRapidas() {
  const inicio = Date.now();
  await esperar(500);
  return {
    alunosAtivos: 1248,
    turmas: 36,
    aprovacaoGeral: 87.4,
    tempoMs: Date.now() - inicio,
  };
}

// Bloco B: consulta demorada (3 segundos)
export async function buscarRelatorioEvasao() {
  const inicio = Date.now();
  await esperar(3000);
  return {
    periodos: [
      { periodo: "2024.1", taxa: 12.8 },
      { periodo: "2024.2", taxa: 11.5 },
      { periodo: "2025.1", taxa: 10.2 },
      { periodo: "2025.2", taxa: 9.1 },
      { periodo: "2026.1", taxa: 8.4 },
    ],
    tempoMs: Date.now() - inicio,
  };
}