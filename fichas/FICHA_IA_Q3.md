# Ficha de Documentação de Uso de IA: Questão Prática 3

**Estudante:** Matheus Costa Mendes **R.A.:** 58381
**Questão:** Dashboard Analítico Assíncrono com Streaming e React Suspense (`app/dashboard/page.js`)
**Ferramenta de IA:** Claude **Versão/Modelo:** Sonnet 5.5 médio

## 0. Observação de transparência

Os prompts abaixo estão copiados literalmente e na ordem em que foram enviados. Nenhuma mensagem anterior ao Prompt 1 tratou desta questão.

## 1. Histórico de prompts

**Prompt 1**

> Preciso de ajuda para fazer um Dashboard Analítico Assíncrono com Streaming e React Suspense
>
> * Localização do Arquivo: app/dashboard/page.js (com loading.js em app/dashboard/loading.js).
> * Conceitos Avaliados: Server-side Data Fetching, renderização progressiva por Streaming, limites de React Suspense e componentes esqueleto (skeletons).
>
> Enunciado: Construa a página de Dashboard Analítico Acadêmico que consome e agrega dados de fontes com tempos de resposta substancialmente heterogêneos:
>
> 1. Arquitetura de Busca no Servidor: A página principal deve ser um Server Component assíncrono que renderiza dois cartões analíticos independentes: o Bloco A (Métricas Rápidas: alunos ativos, turmas, aprovação geral) com resolução simulada rápida de 500ms; e o Bloco B (Relatório Histórico de Evasão), simulando uma consulta demorada com atraso intencional de 3 segundos via Promise.
> 2. Streaming e Suspense Boundary: O Bloco A deve aparecer de forma instantânea para o usuário. O Bloco B deve ser isolado em um elemento `<Suspense fallback={<SkeletonEvasao />}>`, permitindo que a interface seja visualizada em partes à medida que os dados são processados e transmitidos via streaming.
> 3. Transição Imediata com loading.js: Criar o arquivo loading.js para fornecer feedback de transição imediata no momento em que a rota /dashboard é requisitada.
> 4. Exigência de Documentação de IA: Apresentar no relatório de IA os prompts enviados para gerar a simulação assíncrona e detalhar como confirmou visualmente no navegador que a página não bloqueou a exibição do Bloco A durante a espera do Bloco B.

**Prompt 2**

> os testes funcionaram, mas o ms para carregar os Blocos ta muito alto, teria alguma forma de diminuir?

**Prompt 3**

> São esses valores mesmo, acho q esta tudo certo então, achei q era algum problema no meu código

**Prompt 4**

> gere a primeira versão da documentação da IA

*O Prompt 1 gerou o código da questão. Os Prompts 2 e 3 foram consultas sobre o tempo de carregamento: a IA explicou que os valores de 500 ms e 3 s são os atrasos pedidos no enunciado e sugeriu, como opção, disparar as duas consultas em paralelo. Eu não apliquei a sugestão, então o código continua como foi gerado no Prompt 1. O Prompt 4 serviu para montar esta ficha.*

## 2. Mapeamento de autoria

**Gerados integralmente pela IA, sem alterações:**

| Arquivo | Linhas | Prompt |
|---|---|---|
| `app/dashboard/data.js` | 1 a 30 (confirmar no editor) | 1 |
| `app/dashboard/page.js` | 1 a 54 (confirmar no editor) | 1 |
| `app/dashboard/BlocoEvasao.js` | 1 a 26 (confirmar no editor) | 1 |
| `app/dashboard/SkeletonEvasao.js` | 1 a 13 (confirmar no editor) | 1 |
| `app/dashboard/loading.js` | 1 a 29 (confirmar no editor) | 1 |
| `app/dashboard/dashboard.css` | 1 a 38 (confirmar no editor) | 1 |

**Gerados por IA e modificados pelo aluno:** `fichas/FICHA_IA_Q3.md`, linhas 1 a 85. Estrutura e textos de apoio vieram da IA; eu preenchi a identificação, os resultados dos testes e a assinatura.

**100% exclusiva do estudante:** Nenhum.

**Alterações manuais no código:** Toda alteração necessária na raiz do arquivo, foi copiada e inserida manualmente.

## 3. Auditoria e justificativa

**A IA cometeu erros (API obsoleta, falha de compilação)?** ( ) Sim (X) Não
Descrição: O código gerado funcionou ao rodar, sem erros de compilação ou de API. (confirmar)

**Como validei o funcionamento:**

| Teste | Como testei | Resultado observado |
|---|---|---|
| Feedback imediato (`loading.js`) | Abri `/` e depois digitei `/dashboard` na barra de endereço | Apareceu o esqueleto da página inteira por cerca de meio segundo, o loading carrega o Bloco A instantâneamente e em seguida carega o Bloco B|
| Bloco A sem esperar o B | Observei a tela logo após o esqueleto inicial | O Bloco A apareceu com os números enquanto o Bloco B ainda mostrava o skeleton |
| Streaming do Bloco B | Aguardei na mesma tela | Cerca de 3 segundos depois, o skeleton foi trocado pelo relatório de evasão, sem recarregar a página |
| Tempos exibidos | Li o texto "Carregado em X ms" em cada cartão | Os valores ficaram próximos de 500 ms (Bloco A) e 3000 ms (Bloco B), conforme o enunciado |

Todos os testes funcionaram conforme o esperado.

## 4. Como confirmei visualmente que o Bloco A não foi bloqueado pelo Bloco B

Abri `/dashboard` no navegador e observei a sequência na tela. Primeiro apareceu o esqueleto do `loading.js`. Depois o Bloco A (alunos ativos, turmas e aprovação geral) ficou visível, enquanto o Bloco B ainda exibia o skeleton em cinza pulsando. Só cerca de 3 segundos depois o skeleton foi substituído pelas barras do relatório de evasão. Ver o Bloco A na tela durante a espera do Bloco B mostra que a página não ficou bloqueada. Isso acontece porque apenas o Bloco A é aguardado na página principal, e o Bloco B, isolado em `<Suspense fallback={<SkeletonEvasao />}>`, é enviado depois por streaming.
fiz a contraprova trocando o `<Suspense>` por `<BlocoEvasao />` direto, a página passou a aparecer inteira só depois do atraso; depois desfiz a alteração. A requisição do documento ficou em andamento por cerca de 3,5 s.

## 5. Simulação assíncrona (item 4 do enunciado)

Os prompts usados para gerar a simulação assíncrona foram o Prompt 1, que pedia o atraso de 500 ms no Bloco A e de 3 segundos no Bloco B via Promise. A IA gerou, em `data.js`, uma função `esperar(ms)` baseada em `setTimeout` dentro de uma `Promise`, usada por `buscarMetricasRapidas` (500 ms) e `buscarRelatorioEvasao` (3000 ms). A página é um Server Component assíncrono que espera só o Bloco A, e o `BlocoEvasao` é outro Server Component assíncrono que espera o Bloco B.

**Assinatura:** Matheus Costa Mendes **Data:** 26/11/2026