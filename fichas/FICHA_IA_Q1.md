# FICHA DE DOCUMENTAÇÃO DE USO DE IA

## RELATÓRIO DE TRANSPARÊNCIA E AUDITORIA DE IA GENERATIVA

**Identificação da Questão:** Questão Prática Nº: **[ 1 ]** (Catálogo Acadêmico com Layouts Aninhados e Prefetching)

**Estudante:** Matheus Costa Mendes

**R.A.:** 58381

**Ferramentas de IA Utilizadas:** [ ] ChatGPT  [ ] GitHub Copilot  **[X] Claude**  [ ] Gemini  [ ] Outra: ________

**Versão / Modelo Específico:** Claude (Anthropic), chat web/app. Modelo: Sonnet 5.5 médio

---

## 0. Observação de transparência (antes do Prompt 1)

No início da conversa, enviei fotos das páginas da prova (sem texto) e recebi um projeto com as 5 questões práticas já resolvidas. **Esse projeto foi descartado e não foi usado.** Em seguida, conversei com a IA sobre como a ficha deve ser preenchida e pedi a transcrição das questões práticas. Depois, decidi refazer a Questão 1 do zero, a partir do Prompt 1 abaixo. Tudo que foi entregue está nos prompts 1 a 14.

---

## 1. HISTÓRICO COMPLETO DE PROMPTS ENVIADOS À IA

*(Transcrição literal e cronológica)*

### Prompt 1:

"Preciso fazer um catálogo acadêmico com layouts aninhados e prefetchings.

* Localização dos Arquivos: app/cursos/[id]/page.js (com layout aninhado em app/cursos/layout.js).
* Conceitos Avaliados: Segmentos dinâmicos de rotas ([id]), persistência de estado em layouts aninhados, Server Components e componente Link de navegação rápida.


O estudante deve implementar a rota de Detalhes de Cursos do catálogo institucional do TADS, atendendo integralmente às seguintes especificações:

1. Layout Aninhado Compartilhado: O layout de /cursos deve conter uma barra lateral com links para três cursos pré-cadastrados (ID 1: Sistemas Web, ID 2: Banco de Dados, ID 3: Engenharia de Software) e um botão de alternância visual (modo expandido/recolhido) controlado por estado local (Client Component), demonstrando que o layout mantém seu estado ativo durante a transição entre cursos.
2. Página Dinâmica de Conteúdo: A página app/cursos/[id]/page.js deve ser um Server Component assíncrono. Ela deve aguardar e capturar a propriedade assíncrona params. Caso o ID informado na URL não exista no catálogo interno, a aplicação deve disparar obrigatoriamente a função notFound() do pacote next/navigation. Havendo o registro, deve renderizar título, carga horária, ementa descritiva e lista de pré-requisitos.
3. Navegação Otimizada: A transição entre cursos deve ser implementada com o componente `<Link>` utilizando prefetching ativo para navegação sem recarga de tela.
4. Exigência de Documentação de IA: Anexar o relatório informando os prompts fornecidos para gerar a captura de parâmetros assíncronos e como foi verificado o correto funcionamento do disparo da função notFound()."

### Prompt 2:

"vamos fazer o prompt2, gere instruções para criar um ambiente virtual e o passo a passo de como testar o projeto. Crie um arquivo requests para instalar todas as dependencias de uma vez (inclua nas instruções). E ja deixe o README organizado mostrando toda a estrutura e como funciona o catálogo acadêmico."

### Prompt 3:

"prompt 3, erro na build, Module not found: Can't resolve './Sidebar'"

*(anexo: print do erro de build exibido pelo Next.js)*

### Prompt 4:

"O erro continua, será q o problema foi nao ter rodado o npm install ?"

*(anexos: print da estrutura de pastas no VS Code e print do erro "Module not found: Can't resolve '../data'")*

### Prompt 5:

"Funcionou mas o css parace nao estar carregando"

*(anexo: print da página no navegador)*

### Prompt 6 (refinamento):

"ficou bom, mas eu não consigo voltar para o inicio, e o software parece muito simples demais"

*(anexo: print da página de Engenharia de Software)*

### Prompt 7:

"ficou perfeito agora. Eu pensei em fazer um documento dentro da pasta q1, com a ficha da documentação da IA, ou colocar no readme dentro da pasta tambem, oque voce acha? Antes de irmos pra atividade 2"

### Prompt 8:

"monte por favor"

*(gerou o arquivo `FICHA_IA_Q1.md`, a própria ficha)*

### Prompts 9 a 12 (consultas e ajustes da própria ficha; não geraram código do projeto):

**Prompt 9:** "onde eu vejo esse modelo"

**Prompt 10:** "como eu testaria esse not found?"

*(anexo: print de um trecho da tabela de testes da ficha)*

**Prompt 11:** "ficou assim"

*(anexo: a ficha preenchida por mim, para revisão)*

**Prompt 12:** "aplica pra mim as alteraçoes"

*(a IA aplicou na ficha as correções sugeridas na revisão do Prompt 11)*

### Prompt 13:

"Antes de ir pra questão 2, um amigo meu fez desse jeito pra pessoa poder acessar todos os exercícios, queria fazer algo parecido tambem, só que com o visual diferente e adicionar em cada um dele, o documento ja de IA, pro professor poder acessar a pagina em cada um dos seus respectivos projetos"

*(anexo: print de uma página com os cartões das 5 questões, usada como referência)*

### Prompt 14:

"então, mas o certo não seria esse layout inicial ficar fora da pasta q1? porque ele abrange todas as questões"

*(a IA renomeou o projeto para `prova-frameworks-frontend`, separou os arquivos compartilhados dos da Questão 1 e generalizou o README)*

---

## 2. MAPEAMENTO DE AUTORIA NO CÓDIGO FONTE

Versão final entregue. Intervalos de linhas conferidos na versão gerada pela IA.

### Blocos gerados integralmente pela IA

| Arquivo | Linhas | Gerado no prompt |
|---|---|---|
| `app/layout.js` | 1 a 15 | 1, 13 e 14 |
| `app/page.js` | 1 a 64 | 13 e 14 |
| `app/globals.css` | 1 a 97 | 5, 6, 13 e 14 |
| `app/components/BarraProva.js` | 1 a 36 | 13 e 14 |
| `app/lib/prova.js` | 1 a 46 | 13 e 14 |
| `app/lib/status.js` | 1 a 18 | 13 |
| `app/not-found.js` | 1 a 10 | 13 |
| `app/fichas/[numero]/page.js` | 1 a 47 | 13 e 14 |
| `app/fichas/[numero]/BotaoImprimir.js` | 1 a 9 | 13 |
| `app/cursos/layout.js` | 1 a 13 | 1 e 14 |
| `app/cursos/cursos.css` | 1 a 59 | 5, 6 e 14 |
| `app/cursos/Sidebar.js` | 1 a 72 | 6 |
| `app/cursos/data.js` | 1 a 69 | 6 |
| `app/cursos/page.js` | 1 a 24 | 6 |
| `app/cursos/[id]/page.js` | 1 a 70 | 6 |
| `app/cursos/[id]/not-found.js` | 1 a 13 | 6 |
| `package.json` | 1 a 19 | 2, 13 e 14 |
| `README.md` | 1 a 158 | 2, 6, 13 e 14 |
| `.nvmrc` | 1 a 1 | 2 |
| `.gitignore` | 1 a 2 | 2 |

Os arquivos de `app/` fora de `app/cursos/` (painel da prova, barra superior, fichas e estilos compartilhados) valem para as 5 questões. A pasta `app/cursos/` é exclusiva da Questão 1.

Observação: o `package-lock.json` foi gerado automaticamente pelo `npm`, e a pasta `node_modules` é instalada pelo `npm`.

### Blocos gerados por IA e modificados pelo aluno

Linhas: 1 a 196 do arquivo `fichas/FICHA_IA_Q1.md` (a própria ficha).

**Descrição das alterações manuais:**

Nenhuma alteração manual no conteúdo do código do projeto. Na ficha, a estrutura e os textos de apoio foram gerados pela IA (Prompt 8), e eu preenchi a identificação, o modelo utilizado, a marcação de erros da IA, os resultados dos testes, a descrição da verificação do `notFound()` e a assinatura. Os ajustes de revisão foram aplicados pela IA a meu pedido (Prompt 12).

### Blocos de autoria 100% exclusiva do estudante

Nenhum.

---

## 3. AUDITORIA E JUSTIFICATIVA TÉCNICA DO ESTUDANTE

**A IA cometeu erros de compilação ou sugeriu APIs legadas (ex: Pages Router em vez de App Router)?** [ ] Sim  [X] Não

Marquei "Não" porque o código gerado compilou e usa o App Router; os erros abaixo ocorreram porque arquivos foram colados no lugar errado no meu computador.

**Em caso afirmativo, qual foi o erro e como você o solucionou?**

Durante a execução (`npm run dev`) apareceram dois erros de build:

1. `Module not found: Can't resolve './Sidebar'` em `./app/layout.js` (Prompt 3).
2. `Module not found: Can't resolve '../data'` em `./app/page.js` (Prompt 4).

Em ambos, o conteúdo de um arquivo (`app/cursos/layout.js` e `app/cursos/[id]/page.js`) estava dentro de outro arquivo de mesmo nome em outra pasta (`app/layout.js` e `app/page.js`), porque o projeto tem dois `layout.js` e dois `page.js`. A solução foi restaurar o conteúdo correto de cada arquivo, conforme a estrutura de pastas, apagar a pasta `.next` e rodar `npm run dev` novamente. Depois disso, o projeto funcionou.

**Como você validou que a solução gerada atende com rigor técnico aos requisitos do enunciado?**

| Requisito do enunciado | Como testei | Resultado observado |
|---|---|---|
| Layout aninhado mantém o estado | Abri `/cursos/1`, cliquei em "« Recolher" e depois em outro curso | A barra lateral continuou recolhida ao trocar de curso, como esperado |
| Barra lateral com 3 cursos e botão expandir/recolher | Conferi os links Sistemas Web, Banco de Dados, Engenharia de Software e o botão | Os caminhos estão funcionando corretamente, as três abas de curso respondem corretamente |
| Página dinâmica mostra título, carga horária, ementa e pré-requisitos | Abri `/cursos/1`, `/cursos/2` e `/cursos/3` | Todos mostram as informações esperadas para cada curso, assim como foi solicitado na atividade |
| Navegação com `<Link>` e prefetch, sem recarga | Executei `npm run build` e `npm start` e naveguei entre as rotas `/cursos/1`, `/cursos/2` e `/cursos/3` | A build funcionou como esperado, não tive problemas entre as rotas /cursos/ |
| `notFound()` para ID inexistente | Abri `/cursos/99` | O notFound funciona corretamente, caso o usuário coloque o id errado na barra de pesquisa |

---

## 4. EXIGÊNCIA ESPECÍFICA DA QUESTÃO 1

**Prompts usados para gerar a captura de parâmetros assíncronos:**
Prompt 1, item 2 do enunciado ("Ela deve aguardar e capturar a propriedade assíncrona params"). Resultado no código: `app/cursos/[id]/page.js`, linha 7, `const { id } = await params;`, dentro de uma função `async` (Server Component assíncrono).

**Como foi verificado o correto funcionamento do disparo de `notFound()`:**
No código, `notFound()` é importado de `next/navigation` (linha 2) e chamado na linha 12 de `app/cursos/[id]/page.js`, quando `findIndex` não encontra o ID (linha 9). Para verificar no navegador, acessei `/cursos/99`, que exibiu a tela "Curso não encontrado" (`not-found.js`). Resultado observado: o site exibe uma página informando que o curso não foi encontrado, com as opções de voltar à página inicial ou ver todos os cursos disponíveis.

---

*Declaro que as informações acima descrevem fielmente o uso de IA nesta questão.*

Assinatura: Matheus Costa Mendes  Data: 26 / 11 / 2026
