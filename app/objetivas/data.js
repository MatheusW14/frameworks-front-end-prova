export const questoesObjetivas = [
    {
      numero: 1,
      enunciado:
        "No Next.js utilizando a arquitetura do App Router, qual é o nome de arquivo obrigatório e padronizado por convenção que deve ser criado dentro de um diretório de rota para tornar essa rota publicamente acessível e renderizar sua interface gráfica principal?",
      alternativas: { A: "index.html", B: "page.js (ou page.tsx)", C: "route.config.js", D: "screen.jsx" },
      correta: "B",
      explicacao: "No App Router, é o arquivo page.js que torna o segmento de rota acessível e renderiza a interface principal da rota.",
    },
    {
      numero: 2,
      enunciado:
        "Por padrão, todos os componentes criados dentro do diretório app/ no Next.js são executados como Server Components. Caso um desenvolvedor necessite utilizar hooks fundamentais de estado e efeitos do React, como useState ou useEffect, qual diretiva deve ser obrigatoriamente declarada na primeira linha do arquivo?",
      alternativas: { A: '"use client";', B: '"use server";', C: '"enable react-hooks";', D: '"client-side-only";' },
      correta: "A",
      explicacao: 'Server Components não usam hooks de estado e efeito. A diretiva "use client" no topo do arquivo marca o Client Component.',
    },
    {
      numero: 3,
      enunciado:
        "Para realizar a transição entre páginas em uma aplicação Next.js sem causar a recarga completa do documento HTML no navegador (full page reload) e aproveitando os mecanismos nativos de pré-carregamento (prefetching) em segundo plano, qual componente deve ser utilizado?",
      alternativas: {
        A: '<a href="..."> nativo do HTML sem interceptação de eventos',
        B: '<Link href="..."> importado do pacote next/link',
        C: '<Navigate to="..."> importado de react-router-dom',
        D: '<Anchor target="..."> importado de next/router',
      },
      correta: "B",
      explicacao: "O componente Link (next/link) navega no cliente, sem recarregar o documento, e faz o prefetch das rotas em segundo plano.",
    },
    {
      numero: 4,
      enunciado:
        "Ao navegar para uma rota que realiza operações assíncronas de busca de dados no servidor, qual arquivo reservado do App Router o Next.js utiliza automaticamente para renderizar um esqueleto visual imediato através de uma barreira de React Suspense?",
      alternativas: { A: "spinner.html", B: "wait.js", C: "loading.js (ou loading.tsx)", D: "delay.jsx" },
      correta: "C",
      explicacao: "O loading.js cria automaticamente uma fronteira de Suspense e exibe o conteúdo de carregamento enquanto a rota resolve os dados.",
    },
    {
      numero: 5,
      enunciado:
        "Para declarar uma função assíncrona que processa mutações de dados diretamente no ambiente seguro do servidor, permitindo sua invocação a partir de formulários ou botões, qual diretiva deve ser incluída no início do arquivo ou no escopo interno da função?",
      alternativas: { A: '"use server";', B: '"run backend";', C: '"execute node";', D: '"action server";' },
      correta: "A",
      explicacao: 'A diretiva "use server" marca Server Functions/Actions, que executam no servidor e podem ser chamadas a partir de formulários e botões.',
    },
  ];