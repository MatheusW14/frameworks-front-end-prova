# FICHA DE DOCUMENTAÇÃO DE USO DE IA

## RELATÓRIO DE TRANSPARÊNCIA E AUDITORIA DE IA GENERATIVA

**Identificação da Questão:** Questão Prática Nº: **[ 3 ]** (Dashboard Analítico Assíncrono com Streaming e React Suspense)

**Estudante:** Matheus Costa Mendes

**R.A.:** 58381

**Ferramentas de IA Utilizadas:** [ ] ChatGPT  [ ] GitHub Copilot  **[X] Claude**  [ ] Gemini  [ ] Outra: ________

**Versão / Modelo Específico:** Claude (Anthropic), chat web/app. Modelo: Sonnet 5.5 médio

---

## 0. Observação de transparência (antes do Prompt 1)

Nenhuma mensagem anterior ao Prompt 1 tratou desta questão. Tudo que foi entregue está nos prompts 1 a 5.

---

## 1. HISTÓRICO COMPLETO DE PROMPTS ENVIADOS À IA

*(Transcrição literal e cronológica)*

### Prompt 1:

"Preciso de ajuda para fazer um Dashboard Analítico Assíncrono com Streaming e React Suspense

* Localização do Arquivo: app/dashboard/page.js (com loading.js em app/dashboard/loading.js).
* Conceitos Avaliados: Server-side Data Fetching, renderização progressiva por Streaming, limites de React Suspense e componentes esqueleto (skeletons).

Enunciado: Construa a página de Dashboard Analítico Acadêmico que consome e agrega dados de fontes com tempos de resposta substancialmente heterogêneos:

1. Arquitetura de Busca no Servidor: A página principal deve ser um Server Component assíncrono que renderiza dois cartões analíticos independentes: o Bloco A (Métricas Rápidas: alunos ativos, turmas, aprovação geral) com resolução simulada rápida de 500ms; e o Bloco B (Relatório Histórico de Evasão), simulando uma consulta demorada com atraso intencional de 3 segundos via Promise.
2. Streaming e Suspense Boundary: O Bloco A deve aparecer de forma instantânea para o usuário. O Bloco B deve ser isolado em um elemento `<Suspense fallback={<SkeletonEvasao />}>`, permitindo que a interface seja visualizada em partes à medida que os dados são processados e transmitidos via streaming.
3. Transição Imediata com loading.js: Criar o arquivo loading.js para fornecer feedback de transição imediata no momento em que a rota /dashboard é requisitada.
4. Exigência de Documentação de IA: Apresentar no relatório de IA os prompts enviados para gerar a simulação assíncrona e detalhar como confirmou visualmente no navegador que a página não bloqueou a exibição do Bloco A durante a espera do Bloco B."

### Prompt 2:

"os testes funcionaram, mas o ms para carregar os Blocos ta muito alto, teria alguma forma de diminuir?"

*(consulta: a IA explicou que os 500 ms e 3 s são os atrasos pedidos no enunciado e sugeriu, como opção, disparar as duas consultas em paralelo; não apliquei a sugestão)*

### Prompt 3:

"São esses valores mesmo, acho q esta tudo certo então, achei q era algum problema no meu código"

### Prompt 4:

"gere a primeira versão da documentação da IA"

*(gerou a primeira versão da ficha, `FICHA_IA_Q3.md`)*

---

## 2. MAPEAMENTO DE AUTORIA NO CÓDIGO FONTE

### Blocos gerados integralmente pela IA

| Arquivo | Linhas | Gerado no prompt |
|---|---|---|
| `app/dashboard/data.js` | 1 a ____ | 1 |
| `app/dashboard/page.js` | 1 a ____ | 1 |
| `app/dashboard/BlocoEvasao.js` | 1 a ____ | 1 |
| `app/dashboard/SkeletonEvasao.js` | 1 a ____ | 1 |
| `app/dashboard/loading.js` | 1 a ____ | 1 |
| `app/dashboard/dashboard.css` | 1 a ____ | 1 |

### Blocos gerados por IA e modificados pelo aluno

Linhas: 1 a ____ do arquivo `fichas/FICHA_IA_Q3.md` (a própria ficha).

**Descrição das alterações manuais:**

Nenhuma alteração manual no código do projeto. Na ficha, a estrutura e os textos de apoio foram gerados pela IA (Prompts 4 e 5), e eu preenchi a identificação, o modelo utilizado, os resultados dos testes e a assinatura.

### Blocos de autoria 100% exclusiva do estudante

Nenhum.

---

## 3. AUDITORIA E JUSTIFICATIVA TÉCNICA DO ESTUDANTE

**A IA cometeu erros de compilação ou sugeriu APIs legadas?** [ ] Sim  [X] Não

Marquei "Não" porque o código gerado funcionou ao rodar, sem erros de compilação ou de API.

**Em caso afirmativo, qual foi o erro e como você o solucionou?**

Não se aplica.

**Como você validou que a solução gerada atende com rigor técnico aos requisitos do enunciado?**

| Requisito do enunciado | Como testei | Resultado observado |
|---|---|---|
| Feedback imediato com `loading.js` | Abri `/` e depois digitei `/dashboard` na barra de endereço | Apareceu o esqueleto da página inteira logo ao entrar |
| Bloco A sem esperar o Bloco B | Observei a tela logo após o esqueleto inicial | O Bloco A apareceu com os números enquanto o Bloco B ainda mostrava o skeleton |
| Streaming do Bloco B com Suspense | Aguardei na mesma tela | Cerca de 3 segundos depois, o skeleton foi trocado pelo relatório de evasão, sem recarregar a página |
| Atrasos simulados de 500 ms e 3 s | Li o texto "Carregado em X ms" em cada cartão | Os valores ficaram próximos de 500 ms (Bloco A) e 3000 ms (Bloco B), conforme o enunciado |

---

## 4. EXIGÊNCIA ESPECÍFICA DA QUESTÃO 3

**Prompts usados para gerar a simulação assíncrona:**
Prompt 1, item 1 do enunciado (atraso de 500 ms no Bloco A e de 3 segundos no Bloco B via Promise). A IA gerou, em `data.js`, uma função `esperar(ms)` baseada em `setTimeout` dentro de uma `Promise`, usada por `buscarMetricasRapidas` (500 ms) e `buscarRelatorioEvasao` (3000 ms). A página é um Server Component assíncrono que espera só o Bloco A, e o `BlocoEvasao` é outro Server Component assíncrono que espera o Bloco B.

**Como confirmei visualmente que o Bloco A não foi bloqueado durante a espera do Bloco B:**
Abri `/dashboard` no navegador e observei a sequência na tela. Primeiro apareceu o esqueleto do `loading.js`. Depois o Bloco A (alunos ativos, turmas e aprovação geral) ficou visível, enquanto o Bloco B ainda exibia o skeleton em cinza pulsando. Só cerca de 3 segundos depois o skeleton foi substituído pelas barras do relatório de evasão. Ver o Bloco A na tela durante a espera do Bloco B mostra que a página não ficou bloqueada, porque a página principal aguarda apenas o Bloco A, e o Bloco B, isolado em `<Suspense fallback={<SkeletonEvasao />}>`, é enviado depois por streaming.

---

*Declaro que as informações acima descrevem fielmente o uso de IA nesta questão.*

Assinatura: Matheus Costa Mendes  Data: 26 / 11 / 2026