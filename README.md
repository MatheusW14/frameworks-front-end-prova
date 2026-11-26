# Prova de Frameworks Front-end (Next.js)

Avaliação teórico-prática de Frameworks Front-end (TADS, IFMS Campus Três Lagoas).
Projeto único em **Next.js 15 (App Router)** com JavaScript. Cada questão prática é uma rota dentro da pasta `app/`, e a Parte I (objetivas) tem uma página própria.

**Estudante:** Matheus Costa Mendes · **R.A.:** 58381

## Visão geral

| Parte | Rota | Pasta | Conceitos |
|---|---|---|---|
| I. Questões Objetivas | `/objetivas` | `app/objetivas/` | App Router, Client/Server Components, Link, loading.js, Server Actions |
| 1. Catálogo Acadêmico | `/cursos` | `app/cursos/` | Rotas dinâmicas, layout aninhado, `notFound()`, `<Link>` com prefetch |
| 2. Gestão de Projetos | `/projetos` | `app/projetos/` | `useState`, `useEffect`, `useMemo`, WAI-ARIA, `localStorage` |
| 3. Dashboard Analítico | `/dashboard` | `app/dashboard/` | Streaming, `<Suspense>`, `loading.js`, skeletons |
| 4. Ouvidoria Acadêmica | `/ouvidoria` | `app/ouvidoria/` | Server Actions, `FormData`, `revalidatePath`, `useActionState` |
| 5. Portal IFMS | `/portal` | `app/portal/` | Context API, padrão `children`, `server-only` |

O **painel da prova** (`/`) mostra um cartão para a Parte I e um para cada questão prática. Cada questão tem uma **ficha de documentação de uso de IA** na pasta `fichas/`, acessível pelo painel e pela barra superior.

## Ambiente e instalação

Este é um projeto **Node.js**, então não usa `venv` do Python. O equivalente é:

- **Ambiente isolado:** as dependências ficam na pasta `node_modules` dentro do projeto, sem instalar nada global.
- **Arquivo de dependências (equivalente ao requirements.txt):** o `package.json`, junto com o `package-lock.json`, que trava as versões exatas.
- **Versão do Node:** o arquivo `.nvmrc` indica a versão 20. O projeto funciona com Node 18.18 ou superior.

### Dependências

| Pacote | Para que serve |
|---|---|
| `next` | Framework (App Router) |
| `react` e `react-dom` | Biblioteca de interface (a Questão 4 usa `useActionState`, que exige React 19) |
| `marked` | Converte as fichas (Markdown) em HTML |
| `server-only` | Impede que um módulo do servidor seja importado no cliente (Questão 5) |

### Passo a passo

1. **Verifique o Node.js** (precisa ser 18.18 ou superior):
   ```bash
   node -v
   ```
   Se não tiver, instale em https://nodejs.org (versão LTS).

2. **(Opcional) Fixe a versão do Node com nvm** (Linux/macOS: `nvm`; Windows: `nvm-windows`):
   ```bash
   nvm install 20
   nvm use 20
   ```

3. **Entre na pasta do projeto:**
   ```bash
   cd prova-frameworks-frontend
   ```

4. **Instale todas as dependências de uma vez:**
   ```bash
   npm ci
   ```
   `npm ci` instala exatamente as versões do `package-lock.json`. Se der erro, use `npm install`.

5. **Rode em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
   Abra http://localhost:3000

6. **Para os testes de prefetching (Questão 1) e streaming (Questão 3), rode em modo produção:**
   ```bash
   npm run build
   npm start
   ```
   Para parar o servidor, use `Ctrl + C`.

## Estrutura de arquivos

```
prova-frameworks-frontend/
├── package.json          # dependências e scripts
├── package-lock.json     # versões exatas
├── .nvmrc                # versão do Node
├── README.md
├── fichas/
│   ├── FICHA_IA_Q1.md    # uma ficha de documentação de IA por questão
│   ├── FICHA_IA_Q2.md
│   ├── FICHA_IA_Q3.md
│   ├── FICHA_IA_Q4.md
│   └── FICHA_IA_Q5.md
└── app/
    ├── layout.js         # layout raiz (html/body) com a barra superior
    ├── page.js           # painel da prova (cartões da Parte I e das questões)
    ├── not-found.js      # página 404 geral
    ├── globals.css       # estilos compartilhados (base, barra, painel, fichas)
    ├── providers.js      # Questão 5: contexto de acessibilidade (Client Component)
    ├── components/
    │   └── BarraProva.js # barra superior (Client Component)
    ├── lib/
    │   ├── prova.js      # dados da prova, das 5 questões e da Parte I
    │   └── status.js     # verifica quais questões e fichas já existem
    ├── fichas/
    │   └── [numero]/
    │       ├── page.js           # exibe a ficha de IA da questão
    │       └── BotaoImprimir.js  # botão imprimir / salvar em PDF
    ├── objetivas/        # Parte I
    │   ├── page.js           # questões com o gabarito marcado
    │   ├── data.js           # enunciados, alternativas e respostas
    │   └── objetivas.css
    ├── cursos/           # Questão 1
    │   ├── layout.js     # layout aninhado de /cursos (Server Component)
    │   ├── cursos.css
    │   ├── Sidebar.js    # barra lateral (Client Component)
    │   ├── data.js       # catálogo com os 3 cursos
    │   ├── page.js       # página de /cursos (cartões dos cursos)
    │   └── [id]/
    │       ├── page.js       # detalhes do curso (Server Component assíncrono)
    │       └── not-found.js  # tela exibida quando o ID não existe
    ├── projetos/         # Questão 2
    │   ├── page.js       # painel de projetos (Client Component)
    │   └── projetos.css
    ├── dashboard/        # Questão 3
    │   ├── page.js           # Server Component assíncrono (espera o Bloco A)
    │   ├── loading.js        # feedback imediato de transição
    │   ├── BlocoEvasao.js    # Bloco B (espera 3 s, dentro do Suspense)
    │   ├── SkeletonEvasao.js # esqueleto do Bloco B
    │   ├── data.js           # simulação das consultas (500 ms e 3 s)
    │   └── dashboard.css
    ├── ouvidoria/        # Questão 4
    │   ├── page.js                 # formulário + mural (Server Component)
    │   ├── FormularioOuvidoria.js  # formulário com useActionState (Client Component)
    │   ├── actions.js              # Server Action ("use server")
    │   ├── store.js                # repositório simulado em memória
    │   ├── constantes.js           # tipos de manifestação e tamanho mínimo
    │   └── ouvidoria.css
    └── portal/           # Questão 5
        ├── layout.js                 # envolve a página com o provedor
        ├── page.js                   # mural de avisos (Server Component)
        ├── BarraAcessibilidade.js    # botões de acessibilidade (Client Component)
        ├── comunicados.service.js    # serviço protegido por "server-only"
        └── portal.css
```

Tudo que fica em `app/` fora das pastas das questões é compartilhado. Cada questão ocupa a sua própria pasta, com o seu próprio CSS. A exceção é `app/providers.js`, que fica em `app/` porque o enunciado da Questão 5 pede esse caminho.

## Painel e fichas de IA (compartilhado)

**Painel (`app/page.js`).** Mostra o cartão da Parte I e lê a lista de questões de `app/lib/prova.js`. Para cada questão, verifica no disco se a página da rota existe (`app/<rota>/page.js`) e se a ficha existe (`fichas/FICHA_IA_Q<n>.md`). Quando uma questão é criada, ela passa a aparecer como "Disponível" sem mexer no painel. O nome e o R.A. exibidos ficam em `app/lib/prova.js`.

**Barra superior (`app/components/BarraProva.js`).** Aparece em todas as páginas, com o link para o painel e, dentro de uma questão, o botão "Ficha de IA" daquela questão.

**Fichas (`app/fichas/[numero]/page.js`).** Server Component assíncrono que lê o arquivo Markdown da ficha e o converte em HTML com a biblioteca `marked`. Se a ficha ainda não existe, mostra um aviso. Há um botão para imprimir ou salvar em PDF.

## Parte I: Questões Objetivas

Rota `/objetivas`. Mostra as 5 questões de múltipla escolha com a alternativa correta marcada, a explicação de cada uma e uma tabela de gabarito no final.

| Questão | Resposta |
|---|---|
| 1 | B) `page.js` (ou `page.tsx`) |
| 2 | A) `"use client";` |
| 3 | B) `<Link>` de `next/link` |
| 4 | C) `loading.js` (ou `loading.tsx`) |
| 5 | A) `"use server";` |

## Questão 1: Catálogo Acadêmico (layouts aninhados e prefetching)

| URL | Resultado |
|---|---|
| `/cursos` | Layout com a barra lateral e cartões com todos os cursos |
| `/cursos/1` | Sistemas Web |
| `/cursos/2` | Banco de Dados |
| `/cursos/3` | Engenharia de Software |
| `/cursos/qualquer-outro-id` | Página "Curso não encontrado" (HTTP 404) |
| `/fichas/1` | Ficha de documentação de uso de IA da Questão 1 |

### Funcionalidades

- Barra lateral com atalhos **Início** (painel) e **Todos os cursos**, links para os 3 cursos e botão de expandir/recolher.
- Cartões de cursos em `/cursos`, cada um levando à página de detalhes.
- Página de detalhes com trilha de navegação (Início / Cursos / curso), ementa, objetivos, tópicos e pré-requisitos.
- Pré-requisitos que também são cursos do catálogo viram links.
- Navegação **← anterior / próximo →** entre cursos.
- Página de curso não encontrado com links para voltar.

### Como funciona

**Layout aninhado (`app/cursos/layout.js`).** Envolve todas as páginas de `/cursos`. Ao navegar de `/cursos/1` para `/cursos/2`, o Next.js troca só o conteúdo (`children`) e mantém o layout montado, por isso o estado da barra lateral é preservado.

**Barra lateral (`Sidebar.js`).** É um Client Component (`"use client"`). Usa `useState` para alternar entre expandida e recolhida, e `usePathname` para destacar a página atual. Lista os cursos de `data.js` com `<Link prefetch={true}>`.

**Página do curso (`app/cursos/[id]/page.js`).** É um Server Component assíncrono. O `[id]` é um segmento dinâmico: a URL `/cursos/2` entrega `id = "2"`. No Next 15, `params` é uma Promise, então o código faz `await params`. Se o curso não existe em `data.js`, chama `notFound()` (de `next/navigation`), que exibe o `not-found.js` com status 404.

### Roteiro de teste

1. **Estado do layout:** abra `/cursos/1`, clique em "« Recolher" e depois em "Banco de Dados". A barra deve continuar recolhida.
2. **Conteúdo dinâmico:** clique em cada um dos 3 cursos. Título, carga horária, ementa e pré-requisitos devem mudar.
3. **Prefetching:** em modo produção (`npm run build` e `npm start`), com a aba Network aberta (F12), recarregue `/cursos/1`. Devem aparecer requisições de prefetch para `/cursos/2` e `/cursos/3`.
4. **notFound():** acesse `/cursos/99`. Deve aparecer "Curso não encontrado", com status 404 na aba Network.
5. **Voltar ao início:** use "Início" na barra lateral ou a trilha de navegação.

## Questão 2: Painel de Gestão de Projetos

Rota `/projetos`. Cadastro e monitoramento dos Projetos Integradores do curso de ADS, executado inteiramente no navegador.

### Como funciona

- **Formulário controlado (`useState`).** Campos Nome do Projeto (mínimo de 5 caracteres), Área Temática (Frontend, Backend, Mobile, DevOps) e Prazo de Conclusão. Com menos de 5 caracteres, o campo recebe borda vermelha, `aria-invalid="true"` e `aria-describedby` apontando para a mensagem de erro. O botão fica desabilitado até o formulário ser válido.
- **Filtros com `useMemo`.** A lista é filtrada por texto e por área dentro de um `useMemo` com as dependências `[projetos, busca, areaFiltro]`. Digitar no formulário não dispara a filtragem.
- **Persistência com `useEffect`.** Um efeito lê o `localStorage` ao carregar e outro salva quando a lista muda. Os dados permanecem após recarregar a página (chave `projetos-integradores`).
- **Acessibilidade.** `<label>` ligado a cada campo, `role="alert"` nas mensagens de erro, `aria-live` no contador e `aria-label` nos botões de remover.

### Roteiro de teste

1. Digite menos de 5 letras no nome: borda vermelha e mensagem de erro. No DevTools (Elements), confira `aria-invalid` e `aria-describedby`.
2. Cadastre um projeto e recarregue com F5: ele continua na lista. No DevTools (Application > Local Storage) aparece a chave `projetos-integradores`.
3. Use a busca e o filtro de área e confira o contador "Exibindo X de Y".
4. Para depurar o `useMemo`, coloque temporariamente um `console.log` dentro dele: digitar no formulário não gera o log, e digitar na busca gera. Remova o log depois.

## Questão 3: Dashboard Analítico com Streaming e Suspense

Rota `/dashboard`. A página é um Server Component assíncrono que agrega duas fontes de dados com tempos diferentes.

### Como funciona

- **Bloco A (métricas rápidas).** Alunos ativos, turmas e aprovação geral, com atraso simulado de 500 ms. A página espera só por ele.
- **Bloco B (relatório histórico de evasão).** Atraso simulado de 3 segundos via `Promise`. Fica em um Server Component separado (`BlocoEvasao.js`), isolado em `<Suspense fallback={<SkeletonEvasao />}>`. Por isso chega depois, por streaming, sem bloquear o Bloco A.
- **`loading.js`.** Mostra um esqueleto da página inteira assim que `/dashboard` é requisitada, enquanto o Bloco A resolve.
- **`export const dynamic = "force-dynamic"`.** Faz a página ser renderizada a cada requisição, para o atraso e o streaming ficarem visíveis em vez de a página ser gerada estática no build.

### Roteiro de teste

Prefira `npm run build` e `npm start`, porque em `npm run dev` o primeiro acesso soma o tempo de compilação.

1. Abra `/` e depois digite `/dashboard` na barra de endereço: aparece o esqueleto da página inteira (`loading.js`).
2. Em seguida o Bloco A aparece com os números, enquanto o Bloco B mostra o skeleton cinza.
3. Cerca de 3 segundos depois, o skeleton é trocado pelo relatório de evasão, sem recarregar a página. Cada cartão mostra "Carregado em X ms", com valores perto de 500 e 3000.
4. (Opcional) Troque temporariamente o `<Suspense>` por `<BlocoEvasao />` direto: a página passa a aparecer inteira só depois do atraso. Desfaça em seguida.

## Questão 4: Mural de Ouvidoria com Server Actions

Rota `/ouvidoria`. Formulário de manifestações (Elogio, Sugestão, Reclamação) com mural público atualizado a cada envio.

### Como funciona

- **Server Action (`actions.js`).** Marcada com `"use server"`. Recebe o `FormData`, lê `nome`, `tipo` e `mensagem` e valida no servidor. Mensagem com menos de 10 caracteres devolve um objeto estruturado de erro (`{ ok: false, erros, valores }`) e nada é gravado.
- **Repositório em memória (`store.js`).** Guarda as manifestações enquanto o servidor estiver rodando (zera ao reiniciar).
- **Revalidação.** Com dados válidos, a ação grava e chama `revalidatePath('/ouvidoria')`. O mural, que é um Server Component, vem atualizado na mesma resposta.
- **Sem recarregar a página.** O formulário usa `<form action={formAction}>` com `useActionState`. O React intercepta o envio e chama a Server Action por `fetch`, sem navegação do navegador.
- **Feedback de envio.** `useFormStatus` desabilita o botão e troca o texto para "Registrando manifestação..." enquanto a ação está pendente. A ação tem um atraso simulado de 1,2 s para o feedback ficar visível.

### Roteiro de teste

1. Envie uma mensagem com menos de 10 caracteres: o botão mostra "Registrando manifestação...", depois aparece o erro em vermelho e a manifestação não entra no mural.
2. Envie uma mensagem válida: aparece "Manifestação registrada com sucesso!", o formulário limpa e a manifestação surge no topo do mural.
3. **Sem recarregar:** no Console, digite `window.teste = "ainda aqui"`, envie uma manifestação válida e leia `window.teste`. O valor continua lá.
4. **Uma rodada de rede:** na aba Network, limpe a lista e envie o formulário. Deve aparecer uma requisição `POST` para `/ouvidoria`, sem nova requisição de documento.

## Questão 5: Portal Híbrido com Context API e `server-only`

Rota `/portal`. Portal de comunicados do IFMS com preferências de acessibilidade no cliente e dados confidenciais no servidor.

### Como funciona

- **Contexto (`app/providers.js`).** Marcado com `"use client"`. Cria o `AcessibilidadeContext`, com os estados Alto Contraste e Tamanho da Fonte, e o hook `useAcessibilidade`.
- **Padrão `children`.** O `AcessibilidadeProvider` recebe `children`. O `app/portal/layout.js` (Server Component) o usa para envolver a página. Como a página chega como `children`, já renderizada pelo servidor, ela continua sendo Server Component.
- **Barra de acessibilidade (`BarraAcessibilidade.js`).** É o único Client Component da página. Consome o contexto e oferece os botões de alternância.
- **Mural de avisos.** Gerado no servidor por `app/portal/page.js`. O alto contraste e a fonte ampliada chegam a ele por CSS, a partir de atributos `data-contraste` e `data-fonte` no elemento do provedor, sem transformá-lo em Client Component.
- **`server-only` (`comunicados.service.js`).** O módulo começa com `import "server-only";`. Se algum Client Component o importar, o build falha, e o código e a credencial fictícia nunca vão para o navegador.

### Roteiro de teste

1. Abra `/portal` e clique em "Alto contraste": a página fica preta com texto amarelo e branco, inclusive o mural. Clique em "Fonte": os textos aumentam.
2. Abra o código-fonte (Ctrl+U): os textos dos comunicados já estão no HTML, porque foram gerados no servidor.
3. **Barreira do `server-only`:** em `BarraAcessibilidade.js`, adicione temporariamente `import { listarComunicados } from "./comunicados.service";`. O Next.js deve acusar erro de build informando que o módulo é só de servidor. Remova a linha em seguida.
4. (Opcional) Rode `npm run build` e procure o texto `TOKEN-SECRETO-IFMS-2026` na pasta `.next/static`. Não deve aparecer em nenhum arquivo.

## Problemas comuns

- **`npm: command not found`:** o Node.js não está instalado ou o terminal precisa ser reaberto.
- **Porta 3000 ocupada:** rode `npx next dev -p 3001`.
- **Erro de versão do Node:** rode `node -v` e atualize para 18.18 ou superior.
- **`Module not found` logo depois de copiar arquivos:** confira se cada `layout.js` e `page.js` está na pasta certa (há arquivos com o mesmo nome em `app/`, `app/cursos/` e `app/portal/`), apague a pasta `.next` e rode de novo.
- **`Can't resolve 'server-only'`:** rode `npm install` (o pacote deve constar no `package.json`).
- **`useActionState` não é exportado de `react`:** o projeto precisa do React 19 e do Next 15. Rode `npm install` e confira as versões no `package.json`.
- **Dados da Ouvidoria sumiram:** o repositório fica em memória e zera quando o servidor reinicia.