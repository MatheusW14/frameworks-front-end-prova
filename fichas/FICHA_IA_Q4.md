# Ficha de Documentação de Uso de IA: Questão Prática 4

**Estudante:** Matheus Costa Mendes **R.A.:** 58381
**Questão:** Mural de Ouvidoria com Server Actions e Revalidação de Cache (`app/ouvidoria/page.js`)
**Ferramenta de IA:** Claude **Versão/Modelo:** Sonnet 5.5 médio

## 0. Observação de transparência

Os prompts abaixo estão copiados literalmente e na ordem em que foram enviados. Nenhuma mensagem anterior ao Prompt 1 tratou desta questão.

## 1. Histórico de prompts

**Prompt 1**

> Preciso de ajuda para construir um Mural de Ouvidoria com Server Actions e Revalidação de Cache
>
> * Localização do Arquivo: app/ouvidoria/page.js (com Server Action declarada no escopo do servidor).
> * Conceitos Avaliados: Server Functions/Actions ("use server"), processamento de FormData, revalidação com revalidatePath e feedback de envio assíncrono.
>
> Enunciado: Desenvolva a página de Ouvidoria Acadêmica que recebe manifestações dos estudantes e atualiza o mural público em uma única rodada de rede:
>
> 1. Processamento Seguro com Server Action: Programar uma função assíncrona marcada com a diretiva "use server". A ação deve receber o FormData enviado pelo formulário, e capturar os campos Nome, Tipo de Manifestação (Elogio, Sugestão, Reclamação) e Mensagem. Realizar validação no servidor: rejeitar mensagens com menos de 10 caracteres retornando um objeto estruturado de erro.
> 2. Revalidação Imediata do Cache: Sendo os dados válidos, a Server Action deve persistir a manifestação em um repositório simulado em memória e disparar imediatamente a função revalidatePath('/ouvidoria'), garantindo a atualização instantânea do mural.
> 3. Feedback de Processamento: O formulário deve fornecer feedback de carregamento no botão de submissão (desabilitando o botão e alterando o texto para 'Registrando manifestação...') enquanto a promessa estiver pendente.
> 4. Exigência de Documentação de IA: Registrar na ficha os prompts utilizados para conceber a Server Action e descrever a estratégia adotada para evitar o recarregamento clássico da página HTML durante o envio.

**Prompt 2**

> todas as funcionalidades foram testadas e estão funcionando como esperado

*O Prompt 1 gerou o código da questão. O Prompt 2 serviu para montar esta ficha.*

## 2. Mapeamento de autoria

**Gerados integralmente pela IA, sem alterações:**

| Arquivo | Linhas | Prompt |
|---|---|---|
| `app/ouvidoria/constantes.js` | 1 a 3 (confirmar no editor) | 1 |
| `app/ouvidoria/store.js` | 1 a 44 (confirmar no editor) | 1 |
| `app/ouvidoria/actions.js` | 1 a 47 (confirmar no editor) | 1 |
| `app/ouvidoria/FormularioOuvidoria.js` | 1 a 84 (confirmar no editor) | 1 |
| `app/ouvidoria/page.js` | 1 a 52 (confirmar no editor) | 1 |
| `app/ouvidoria/ouvidoria.css` | 1 a 47 (confirmar no editor) | 1 |

**Gerados por IA e modificados pelo aluno:** `fichas/FICHA_IA_Q4.md`, linhas 1 a 79. Estrutura e textos de apoio vieram da IA; eu preenchi a identificação, os resultados dos testes e a assinatura.

**100% exclusiva do estudante:** Nenhum.

**Alterações manuais no código:** Nenhuma.

## 3. Auditoria e justificativa

**A IA cometeu erros (API obsoleta, falha de compilação)?** ( ) Sim (X) Não
Descrição: O código gerado funcionou ao rodar, sem erros de compilação ou de API. (confirmar)

**Como validei o funcionamento:**

| Teste | Como testei | Resultado observado |
|---|---|---|
| Validação no servidor | Enviei uma mensagem com menos de 10 caracteres | O botão ficou desabilitado com "Registrando manifestação..." e depois apareceu o erro em vermelho no campo; a manifestação não entrou no mural e os valores digitados foram mantidos |
| Envio válido e revalidação | Preenchi todos os campos corretamente e enviei | Apareceu "Manifestação registrada com sucesso!", o formulário foi limpo e a manifestação surgiu no topo do mural |
| Feedback no botão | Observei o botão durante o envio | Ficou desabilitado e com o texto "Registrando manifestação..." enquanto a Server Action estava pendente |
| Sem recarregar a página | No Console, defini `window.teste = "ainda aqui"`, enviei uma manifestação válida e li `window.teste` de novo | O valor continuou lá, o que indica que a página não recarregou |
| Uma única rodada de rede | Na aba Network, limpei a lista e enviei o formulário | Apareceu uma requisição `POST` para `/ouvidoria` e nenhuma nova requisição de documento |
| Persistência na memória | Recarreguei a página com F5 | As manifestações cadastradas continuaram no mural |

Todos os testes funcionaram conforme o esperado.

## 4. Estratégia para evitar o recarregamento clássico da página

O formulário é um Client Component que usa `<form action={formAction}>`, onde `formAction` vem do hook `useActionState`. Com isso o React intercepta o envio do formulário e chama a Server Action por `fetch` em segundo plano, em vez de deixar o navegador fazer o envio HTML padrão, que navegaria e recarregaria a página. Depois que a ação grava a manifestação e chama `revalidatePath('/ouvidoria')`, o Next.js devolve na mesma resposta a página já atualizada, e o mural é renderizado de novo no lugar, sem recarregar. É por isso que o mural é atualizado em uma única rodada de rede.
Para confirmar, defini uma variável no Console do navegador antes de enviar o formulário e, depois do envio, ela continuava lá, o que não aconteceria se a página tivesse recarregado.

## 5. Server Action (item 4 do enunciado)

Os prompts usados para conceber a Server Action foram o Prompt 1, que pedia a diretiva `"use server"`, a leitura do `FormData`, a validação no servidor e o `revalidatePath`. A IA gerou, em `actions.js`, a função assíncrona `registrarManifestacao(estadoAnterior, formData)`, com `"use server"` no topo do arquivo. Ela lê `nome`, `tipo` e `mensagem` do `FormData` e valida no servidor. Se a mensagem tiver menos de 10 caracteres, retorna um objeto estruturado de erro (`{ ok: false, erros: { mensagem: ... }, valores }`). Se os dados forem válidos, grava no repositório em memória (`store.js`) e chama `revalidatePath('/ouvidoria')`. A ação tem um atraso simulado de 1,2 s, para o feedback do botão ficar visível.

**Assinatura:** Matheus Costa Mendes **Data:** 26/11/2026