# FICHA DE DOCUMENTAÇÃO DE USO DE IA

## RELATÓRIO DE TRANSPARÊNCIA E AUDITORIA DE IA GENERATIVA

**Identificação da Questão:** Questão Prática Nº: **[ 2 ]** (Painel Interativo de Gestão de Projetos)

**Estudante:** Matheus Costa Mendes

**R.A.:** 58381

**Ferramentas de IA Utilizadas:** [ ] ChatGPT  [ ] GitHub Copilot  **[X] Claude**  [ ] Gemini  [ ] Outra: ________

**Versão / Modelo Específico:** Claude (Anthropic), chat web/app. Modelo: Sonnet 5.5 médio

---

## 0. Observação de transparência (antes do Prompt 1)

Antes do Prompt 1 desta questão, enviei duas mensagens de consulta sobre como seguir com a Questão 2, que não geraram código:

* "voce consegue me ajudar na questão 2 baseano na conversa? ou quer que eu mande o arquivo zipado pra ter uma noção de como esta?"
* "então o meu proximo prompt ja começa a contar pro exercicio 2"

Tudo que foi entregue está nos prompts 1 a 7.

---

## 1. HISTÓRICO COMPLETO DE PROMPTS ENVIADOS À IA

*(Transcrição literal e cronológica)*

### Prompt 1:

"Preciso de ajuda para fazer um Painel Interativo de Gestão de Projetos.

* Localização do Arquivo: app/projetos/page.js.
* Conceitos Avaliados: Client Components ("use client"), reatividade com useState, sincronização com useEffect, otimização com useMemo e acessibilidade WAI-ARIA WCAG.

Enunciado: Desenvolva um painel completo para monitoramento e cadastro dos Projetos Integradores do curso de ADS, executado inteiramente no navegador:

1. Formulário Controlado com Validação Acessível: Construir um formulário controlado via useState com campos: Nome do Projeto (mínimo 5 caracteres), Área Temática (Select: Frontend, Backend, Mobile, DevOps) e Prazo de Conclusão. Em tempo real, se o nome possuir menos de 5 caracteres, a interface deve exibir borda de alerta, aplicar aria-invalid="true" e vincular o texto de erro descritivo através de aria-describedby.
2. Filtragem Reativa Otimizada: A página deve exibir uma lista de projetos cadastrados com filtros por texto de busca e por Área Temática. A computação da filtragem deve ser obrigatoriamente envolvida no hook useMemo para evitar re-execuções pesadas durante digitações no formulário.
3. Persistência de Dados: Utilizar o hook useEffect para carregar e salvar os projetos no localStorage do navegador, garantindo a permanência dos dados após recargas manuais de página.
4. Exigência de Documentação de IA: O estudante deve documentar os prompts usados para estruturar as validações de acessibilidade e explicar como depurou a dependência correta do array do useMemo."

### Prompt 2:

"como eu faço essa depuração do Usememo?"

*(consulta: a IA explicou como depurar; não alterou o código)*

### Prompt 3:

"fiz todos os testes e tudo funcionou como esperado"

### Prompt 4:

"preencha a ficha com as informações que voce ja tem"

*(gerou a primeira versão da ficha, `FICHA_IA_Q2.md`)*

### Prompt 5:

"ficou assim"

*(anexo: a ficha preenchida por mim, para revisão)*

### Prompt 6:

"faz a lista de prompt pra mim então, novamente"

*(a IA refez as seções 0 e 1 da ficha)*

---

## 2. MAPEAMENTO DE AUTORIA NO CÓDIGO FONTE

### Blocos gerados integralmente pela IA

| Arquivo | Linhas | Gerado no prompt |
|---|---|---|
| `app/projetos/page.js` | 1 a 234 | 1 |
| `app/projetos/projetos.css` | 1 a 50 | 1 |

### Blocos gerados por IA e modificados pelo aluno

Linhas: 1 a 132 do arquivo `fichas/FICHA_IA_Q2.md` (a própria ficha).

**Descrição das alterações manuais:**

Nenhuma alteração manual no código do projeto. Para a depuração do `useMemo` (Prompt 2), coloquei temporariamente um `console.log` dentro do `useMemo` e removi em seguida, e a ficha só tem as dimensões geradas pela IA (Prompts 4, 6 e 7). Eu preenchi a identificação, o modelo utilizado, os resultados dos testes e a assinatura.

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
| Validação do nome com acessibilidade | Digitei menos de 5 caracteres no campo Nome e inspecionei o campo no DevTools (Elements) | Borda vermelha e mensagem de erro informando o mínimo de 5 caracteres e quantos faltam; o campo mostrou `aria-invalid="true"` e `aria-describedby="nome-erro"` |
| Persistência no `localStorage` | Cadastrei e excluí projetos, recarreguei com F5 e conferi no DevTools (Application > Local Storage) | A lista se manteve após recarregar, e a chave `projetos-integradores` apareceu no Local Storage |
| Filtros por texto e por área | Usei a busca por nome e o filtro de área | A lista e o contador "Exibindo X de Y" acompanharam cada letra digitada e a categoria selecionada |
| Filtragem dentro do `useMemo` | Coloquei um `console.log` dentro do `useMemo` com o Console aberto | Ver seção 4 |

---

## 4. EXIGÊNCIA ESPECÍFICA DA QUESTÃO 2

**Prompts usados para estruturar as validações de acessibilidade:**
Prompt 1, item 1 do enunciado (`aria-invalid="true"` e `aria-describedby`). A IA gerou o campo com `aria-invalid`, `aria-describedby` apontando para `nome-erro` (ou `nome-ajuda` quando não há erro), `role="alert"` na mensagem e `<label>` ligado a cada campo por `htmlFor`.

**Como depurei a dependência do array do `useMemo`:**
Coloquei temporariamente um `console.log("useMemo: filtrando...")` dentro do `useMemo` e abri o Console do navegador (F12). Ao digitar no campo Nome do projeto, mudar a área ou o prazo do formulário, o log não apareceu. Ao digitar na busca, mudar o filtro de área, cadastrar ou remover um projeto, o log apareceu. Isso confirmou que as dependências `[projetos, busca, areaFiltro]` estão corretas: a filtragem só recalcula quando a lista ou os filtros mudam, e não durante a digitação no formulário. Fiz também a contraprova com `nome` no array: o log passou a aparecer a cada letra digitada. Depois removi o log e voltei o array ao original.

---

*Declaro que as informações acima descrevem fielmente o uso de IA nesta questão.*

Assinatura: Matheus Costa Mendes  Data: 26 / 11 / 2026