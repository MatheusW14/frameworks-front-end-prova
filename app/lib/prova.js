// Dados da prova e das 5 questões (usado pelo painel, pela barra superior e pelas fichas)
export const prova = {
  disciplina: "Frameworks Front-end",
  curso: "Tecnologia em Análise e Desenvolvimento de Sistemas",
  instituicao: "IFMS · Campus Três Lagoas",
  estudante: "Matheus Costa Mendes",
  ra: "58381",
};

export const questoes = [
  {
    numero: 1,
    titulo: "Catálogo Acadêmico",
    descricao: "Detalhes de cursos com barra lateral que mantém o estado entre as páginas.",
    conceitos: ["Layouts aninhados", "Segmento dinâmico [id]", "Link com prefetch", "Server Components"],
    rota: "/cursos",
  },
  {
    numero: 2,
    titulo: "Gestão de Projetos",
    descricao: "Painel de cadastro e filtro de Projetos Integradores com formulário acessível.",
    conceitos: ["Client Components", "useState", "useMemo", "useEffect", "WAI-ARIA"],
    rota: "/projetos",
  },
  {
    numero: 3,
    titulo: "Dashboard Analítico",
    descricao: "Dashboard que mostra os dados rápidos na hora e carrega o relatório lento por streaming.",
    conceitos: ["Streaming", "Suspense", "loading.js", "Skeleton"],
    rota: "/dashboard",
  },
  {
    numero: 4,
    titulo: "Ouvidoria Acadêmica",
    descricao: "Mural de manifestações atualizado por uma Server Action.",
    conceitos: ["Server Actions", "FormData", "revalidatePath"],
    rota: "/ouvidoria",
  },
  {
    numero: 5,
    titulo: "Portal IFMS",
    descricao: "Portal de comunicados com preferências de acessibilidade globais e dados protegidos no servidor.",
    conceitos: ["Context API", "server-only", "Composição com children"],
    rota: "/portal",
  },
];

// Parte I (questões objetivas): cartão exibido no painel antes das questões práticas
export const parteObjetiva = {
  rotulo: "I",
  titulo: "Questões Objetivas",
  descricao: "Cinco questões de múltipla escolha sobre App Router, componentes e Server Actions, com o gabarito já marcado.",
  conceitos: ["5 questões", "Múltipla escolha", "Gabarito marcado"],
  rota: "/objetivas",
};