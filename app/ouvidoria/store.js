// Repositório simulado em memória (some quando o servidor é reiniciado).
// Fica em globalThis para sobreviver ao recarregamento de módulos do modo dev.
const global = globalThis;

if (!global.__ouvidoriaStore) {
  global.__ouvidoriaStore = {
    proximoId: 3,
    manifestacoes: [
      {
        id: 2,
        nome: "Ana Souza",
        tipo: "Elogio",
        mensagem: "A biblioteca ampliou o horário e isso ajudou muito nas semanas de prova.",
        criadoEm: "2026-11-20T14:30:00.000Z",
      },
      {
        id: 1,
        nome: "Carlos Lima",
        tipo: "Sugestão",
        mensagem: "Seria ótimo ter mais tomadas disponíveis nas salas de aula do bloco B.",
        criadoEm: "2026-11-18T10:15:00.000Z",
      },
    ],
  };
}

const store = global.__ouvidoriaStore;

// Mais recentes primeiro
export function listarManifestacoes() {
  return [...store.manifestacoes].sort((a, b) => b.id - a.id);
}

export function adicionarManifestacao({ nome, tipo, mensagem }) {
  const nova = {
    id: store.proximoId++,
    nome,
    tipo,
    mensagem,
    criadoEm: new Date().toISOString(),
  };
  store.manifestacoes.push(nova);
  return nova;
}