export const cursos = [
  {
    id: 1,
    titulo: "Sistemas Web",
    cargaHoraria: "80 horas",
    area: "Desenvolvimento",
    resumo: "Construção de aplicações web modernas, do HTML ao uso de frameworks.",
    ementa:
      "Fundamentos de HTML, CSS e JavaScript, comunicação cliente-servidor e desenvolvimento de aplicações web com frameworks modernos, com foco em acessibilidade e responsividade.",
    objetivos: [
      "Construir páginas web responsivas e acessíveis",
      "Compreender o modelo cliente-servidor e o protocolo HTTP",
      "Desenvolver aplicações com frameworks front-end modernos",
    ],
    topicos: [
      "HTML semântico e CSS",
      "JavaScript moderno",
      "Consumo de APIs",
      "Frameworks front-end (React e Next.js)",
      "Acessibilidade e responsividade",
    ],
    preRequisitos: ["Lógica de Programação", "Introdução à Informática"],
  },
  {
    id: 2,
    titulo: "Banco de Dados",
    cargaHoraria: "60 horas",
    area: "Dados",
    resumo: "Modelagem, SQL e transações para armazenar e consultar dados.",
    ementa:
      "Modelagem conceitual e relacional, linguagem SQL, normalização, índices e controle de transações em sistemas gerenciadores de banco de dados.",
    objetivos: [
      "Modelar dados com o modelo entidade-relacionamento",
      "Escrever consultas SQL com junções e agregações",
      "Aplicar normalização e entender transações",
    ],
    topicos: [
      "Modelo entidade-relacionamento",
      "Modelo relacional e normalização",
      "SQL: criação, manipulação e consulta",
      "Índices e desempenho",
      "Transações e concorrência",
    ],
    preRequisitos: ["Lógica de Programação"],
  },
  {
    id: 3,
    titulo: "Engenharia de Software",
    cargaHoraria: "60 horas",
    area: "Processos",
    resumo: "Processos, requisitos, arquitetura e qualidade no desenvolvimento de software.",
    ementa:
      "Processos de software, levantamento e especificação de requisitos, modelagem, arquitetura, testes e metodologias ágeis aplicadas a projetos reais.",
    objetivos: [
      "Comparar processos tradicionais e ágeis",
      "Especificar requisitos e modelar sistemas com UML",
      "Planejar testes e garantir a qualidade do software",
    ],
    topicos: [
      "Ciclo de vida e processos de software",
      "Levantamento e especificação de requisitos",
      "Modelagem com UML",
      "Arquitetura de software",
      "Testes e qualidade",
      "Scrum e Kanban",
    ],
    preRequisitos: ["Sistemas Web", "Banco de Dados"],
  },
];
