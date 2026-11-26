# Catálogo Acadêmico TADS: Layouts Aninhados e Prefetching

Questão Prática 1 da avaliação de Frameworks Front-end (IFMS, Campus Três Lagoas).
Projeto em **Next.js 15 (App Router)** com JavaScript.

## O que o projeto faz

Rota `/cursos` com uma barra lateral compartilhada e uma página de detalhes para cada curso:

| URL | Resultado |
|---|---|
| `/` | Página inicial com link para o catálogo |
| `/cursos` | Layout com a barra lateral e cartões com todos os cursos |
| `/cursos/1` | Sistemas Web |
| `/cursos/2` | Banco de Dados |
| `/cursos/3` | Engenharia de Software |
| `/cursos/qualquer-outro-id` | Página "Curso não encontrado" (HTTP 404) |

## Funcionalidades

- Barra lateral com atalhos **Início** e **Todos os cursos**, links para os 3 cursos e botão de expandir/recolher.
- Cartões de cursos em `/cursos`, cada um levando à página de detalhes.
- Página de detalhes com trilha de navegação (Início / Cursos / curso), ementa, objetivos, tópicos e pré-requisitos.
- Pré-requisitos que também são cursos do catálogo viram links.
- Navegação **← anterior / próximo →** entre cursos.
- Página de curso não encontrado com links para voltar.

## Ambiente e instalação

Este é um projeto **Node.js**, então não usa `venv` do Python. O equivalente é:

- **Ambiente isolado:** as dependências ficam na pasta `node_modules` dentro do projeto, sem instalar nada global.
- **Arquivo de dependências (equivalente ao requirements.txt):** o `package.json`, junto com o `package-lock.json`, que trava as versões exatas.
- **Versão do Node:** o arquivo `.nvmrc` indica a versão 20. O projeto funciona com Node 18.18 ou superior.

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
   cd prova-q1
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
   Abra http://localhost:3000/cursos/1

6. **Para o teste de prefetching, rode em modo produção** (o prefetch só é completo em produção):
   ```bash
   npm run build
   npm start
   ```
   Para parar o servidor, use `Ctrl + C`.

## Estrutura de arquivos

```
prova-q1/
├── FICHA_IA_Q1.md        # ficha de documentação de uso de IA
├── package.json          # dependências e scripts
├── package-lock.json     # versões exatas
├── .nvmrc                # versão do Node
├── README.md
└── app/
    ├── layout.js         # layout raiz (html/body)
    ├── globals.css       # estilos
    ├── page.js           # página inicial com link para /cursos
    └── cursos/
        ├── layout.js     # layout aninhado de /cursos (Server Component)
        ├── Sidebar.js    # barra lateral (Client Component)
        ├── data.js       # catálogo com os 3 cursos
        ├── page.js       # página de /cursos (cartões dos cursos)
        └── [id]/
            ├── page.js       # detalhes do curso (Server Component assíncrono)
            └── not-found.js  # tela exibida quando o ID não existe, com links de volta
```

## Como funciona

**Layout aninhado (`app/cursos/layout.js`).** Envolve todas as páginas de `/cursos`. Ao navegar de `/cursos/1` para `/cursos/2`, o Next.js troca só o conteúdo (`children`) e mantém o layout montado, por isso o estado da barra lateral é preservado.

**Barra lateral (`Sidebar.js`).** É um Client Component (`"use client"`). Usa `useState` para alternar entre expandida e recolhida, e `usePathname` para destacar a página atual. Tem os atalhos Início e Todos os cursos, e lista os cursos de `data.js` com `<Link>`.

**Navegação (`<Link prefetch={true}>`).** O Link troca de página sem recarregar o documento HTML e carrega a próxima página em segundo plano (prefetch).

**Página do curso (`app/cursos/[id]/page.js`).** É um Server Component assíncrono. O `[id]` é um segmento dinâmico: a URL `/cursos/2` entrega `id = "2"`. No Next 15, `params` é uma Promise, então o código faz `await params`. Depois procura o curso em `data.js`:
- se encontrar, mostra título, carga horária, ementa, objetivos, tópicos, pré-requisitos e os links para o curso anterior e o próximo;
- se não encontrar, chama `notFound()` (de `next/navigation`), que exibe o `not-found.js` com status 404.

## Roteiro de teste

1. **Estado do layout:** abra `/cursos/1`, clique em "« Recolher" e depois em "Banco de Dados". A barra deve continuar recolhida.
2. **Conteúdo dinâmico:** clique em cada um dos 3 cursos. Título, carga horária, ementa e pré-requisitos devem mudar.
3. **Sem recarga de página:** com o DevTools (F12) aberto na aba Network, clique entre cursos. O documento HTML não deve ser recarregado inteiro, só aparecem requisições de dados da rota.
4. **Prefetching:** em modo produção (`npm run build` e `npm start`), com a aba Network aberta, recarregue `/cursos/1`. Ao carregar a barra lateral, devem aparecer requisições de prefetch para `/cursos/2` e `/cursos/3`.
5. **notFound():** acesse `/cursos/99` e `/cursos/abc`. Deve aparecer "Curso não encontrado". Na aba Network, o documento retorna status 404.

6. **Voltar ao início:** na barra lateral, clique em "Início". Deve abrir a página inicial. Pela trilha de navegação (Início / Cursos / curso) também é possível voltar.
7. **Anterior e próximo:** no fim da página de um curso, use os links "← anterior" e "próximo →".

## Problemas comuns

- **`npm: command not found`:** o Node.js não está instalado ou o terminal precisa ser reaberto.
- **Porta 3000 ocupada:** rode `npx next dev -p 3001`.
- **Erro de versão do Node:** rode `node -v` e atualize para 18.18 ou superior.
