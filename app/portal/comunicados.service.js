import "server-only";

// Credencial fictícia do sistema interno. Por causa do "server-only", este módulo
// nunca pode entrar no bundle do cliente, então este valor não vai para o navegador.
const CHAVE_INTERNA = "TOKEN-SECRETO-IFMS-2026";

const COMUNICADOS_INTERNOS = [
  {
    id: 1,
    titulo: "Reunião do Colegiado de Curso",
    texto: "A reunião do colegiado acontece na sexta-feira, às 14h, na sala de reuniões da coordenação.",
    setor: "Coordenação",
    data: "2026-11-24",
    prioridade: "Urgente",
  },
  {
    id: 2,
    titulo: "Prazo de lançamento de notas",
    texto: "Os professores devem lançar as notas do 2º bimestre no sistema acadêmico até 05/12.",
    setor: "Secretaria Acadêmica",
    data: "2026-11-22",
    prioridade: "Normal",
  },
  {
    id: 3,
    titulo: "Manutenção dos laboratórios",
    texto: "Os laboratórios de informática ficam fechados no sábado para manutenção da rede elétrica.",
    setor: "Infraestrutura",
    data: "2026-11-20",
    prioridade: "Normal",
  },
];

// Função de leitura de dados: só roda no servidor.
export async function listarComunicados() {
  if (!CHAVE_INTERNA) {
    throw new Error("Credencial interna ausente.");
  }
  // Devolve só os campos públicos para a tela (a credencial não sai daqui).
  return COMUNICADOS_INTERNOS.map(({ id, titulo, texto, setor, data, prioridade }) => ({
    id,
    titulo,
    texto,
    setor,
    data,
    prioridade,
  }));
}