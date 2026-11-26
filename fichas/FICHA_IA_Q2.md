# Ficha de Documentação de Uso de IA: Questão Prática 2

**Estudante:** Matheus Costa Mendes **R.A.:** 58381
**Questão:** Painel Interativo de Gestão de Projetos (`app/projetos/page.js`)
**Ferramenta de IA:** Claude **Versão/Modelo:** Sonnet 5.5 médio 

## 0. Observação de transparência

Antes do Prompt 1 desta questão, enviei duas mensagens de consulta sobre como seguir com a Q2, sem geração de código:

- "voce consegue me ajudar na questão 2 baseano na conversa? ou quer que eu mande o arquivo zipado pra ter uma noção de como esta?"
- "então o meu proximo prompt ja começa a contar pro exercicio 2"

Os prompts abaixo estão copiados literalmente e na ordem em que foram enviados.

## 1. Histórico de prompts

**Prompt 1**

> Preciso de ajuda para fazer um Painel Interativo de Gestão de Projetos.
>
> * Localização do Arquivo: app/projetos/page.js.
> * Conceitos Avaliados: Client Components ("use client"), reatividade com useState, sincronização com useEffect, otimização com useMemo e acessibilidade WAI-ARIA WCAG.
>
> Enunciado: Desenvolva um painel completo para monitoramento e cadastro dos Projetos Integradores do curso de ADS, executado inteiramente no navegador:
>
> 1. Formulário Controlado com Validação Acessível: Construir um formulário controlado via useState com campos: Nome do Projeto (mínimo 5 caracteres), Área Temática (Select: Frontend, Backend, Mobile, DevOps) e Prazo de Conclusão. Em tempo real, se o nome possuir menos de 5 caracteres, a interface deve exibir borda de alerta, aplicar aria-invalid="true" e vincular o texto de erro descritivo através de aria-describedby.
> 2. Filtragem Reativa Otimizada: A página deve exibir uma lista de projetos cadastrados com filtros por texto de busca e por Área Temática. A computação da filtragem deve ser obrigatoriamente envolvida no hook useMemo para evitar re-execuções pesadas durante digitações no formulário.
> 3. Persistência de Dados: Utilizar o hook useEffect para carregar e salvar os projetos no localStorage do navegador, garantindo a permanência dos dados após recargas manuais de página.
> 4. Exigência de Documentação de IA: O estudante deve documentar os prompts usados para estruturar as validações de acessibilidade e explicar como depurou a dependência correta do array do useMemo.

**Prompt 2**

> como eu faço essa depuração do Usememo?

**Prompt 3**

> fiz todos os testes e tudo funcionou como esperado

**Prompt 4**

> preencha a ficha com as informações que voce ja tem

**Prompt 5**

> ficou assim
>
> [anexo: texto da ficha FICHA_IA_Q2.md preenchida até aquele momento]

**Prompt 6**

> faz a lista de prompt pra mim então, novamente

*O Prompt 1 gerou o código da questão (`page.js` e `projetos.css`). O Prompt 2 gerou apenas instruções de teste, sem alterar o código. Os Prompts 3 a 6 serviram para montar e revisar esta ficha.*

## 2. Mapeamento de autoria

**Gerados integralmente pela IA, sem alterações:**

| Arquivo | Linhas | Prompt |
|---|---|---|
| `app/projetos/page.js` | 1 a 234 | 1 |
| `app/projetos/projetos.css` | 1 a 50 | 1 |

**Gerados por IA e modificados pelo aluno:** `fichas/FICHA_IA_Q2.md`, linhas 1 a 94. Estrutura e textos de apoio vieram da IA; eu preenchi a identificação, os resultados dos testes e a assinatura.

**100% exclusiva do estudante:** Nenhum.

**Alterações manuais no código:** Toda alteração necessária na raiz do arquivo, foi copiada e inserida manualmente. 

## 3. Auditoria e justificativa

**A IA cometeu erros (API obsoleta, falha de compilação)?** ( ) Sim (X) Não
Descrição: O código gerado funcionou ao rodar. 

**Como validei o funcionamento:**

| Teste | Como testei | Resultado observado |
|---|---|---|
| Validação do nome | Digitei menos de 5 caracteres no campo Nome e inspecionei o campo no DevTools (Elements) | Borda vermelha e mensagem de erro informando o mínimo de 5 caracteres e quantos faltam; o campo mostrou `aria-invalid="true"` e `aria-describedby="nome-erro"` |
| Persistência | Cadastrei e excluí projetos e recarreguei com F5; conferi no DevTools (Application > Local Storage) | A lista se manteve após recarregar, e a chave `projetos-integradores` apareceu no Local Storage |
| Filtros | Usei a busca por nome e o filtro de área | A lista e o contador "Exibindo X de Y" acompanharam cada letra digitada e a categoria selecionada |
| Dependências do `useMemo` | Coloquei um `console.log` dentro do `useMemo` com o Console aberto | Ver seção 4 |

## 4. Como depurei a dependência do array do `useMemo`

Coloquei temporariamente um `console.log("useMemo: filtrando...")` dentro do `useMemo` e abri o Console do navegador (F12). Ao digitar no campo Nome do projeto, mudar a área ou o prazo do formulário, o log não apareceu. Ao digitar na busca, mudar o filtro de área, cadastrar ou remover um projeto, o log apareceu. Isso confirmou que as dependências `[projetos, busca, areaFiltro]` estão corretas: a filtragem só recalcula quando a lista ou os filtros mudam, e não durante a digitação no formulário.
Fiz a contraprova com `nome` no array, o log passou a aparecer a cada letra; depois removi o log e voltei o array ao original.

## 5. Acessibilidade (item 4 do enunciado)

Os prompts usados para estruturar a validação acessível foram o Prompt 1, que pedia `aria-invalid` e `aria-describedby`. A IA gerou o campo com `aria-invalid`, `aria-describedby` apontando para `nome-erro` (ou `nome-ajuda` quando não há erro), `role="alert"` na mensagem e `<label>` ligado a cada campo por `htmlFor`.

**Assinatura:** Matheus Costa Mendes **Data:** 26/11/2026