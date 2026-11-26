# FICHA DE DOCUMENTAÇÃO DE USO DE IA

## RELATÓRIO DE TRANSPARÊNCIA E AUDITORIA DE IA GENERATIVA

**Identificação da Questão:** Questão Prática Nº: **[ 4 ]** (Mural de Ouvidoria com Server Actions e Revalidação de Cache)

**Estudante:** Matheus Costa Mendes

**R.A.:** 58381

**Ferramentas de IA Utilizadas:** [ ] ChatGPT  [ ] GitHub Copilot  **[X] Claude**  [ ] Gemini  [ ] Outra: ________

**Versão / Modelo Específico:** Claude (Anthropic), chat web/app. Modelo: Sonnet 5.5 médio

---

## 0. Observação de transparência (antes do Prompt 1)

Nenhuma mensagem anterior ao Prompt 1 tratou desta questão. Tudo que foi entregue está nos prompts 1 a 3.

---

## 1. HISTÓRICO COMPLETO DE PROMPTS ENVIADOS À IA

*(Transcrição literal e cronológica)*

### Prompt 1:

"Preciso de ajuda para construir um Mural de Ouvidoria com Server Actions e Revalidação de Cache

* Localização do Arquivo: app/ouvidoria/page.js (com Server Action declarada no escopo do servidor).
* Conceitos Avaliados: Server Functions/Actions ("use server"), processamento de FormData, revalidação com revalidatePath e feedback de envio assíncrono.

Enunciado: Desenvolva a página de Ouvidoria Acadêmica que recebe manifestações dos estudantes e atualiza o mural público em uma única rodada de rede:

1. Processamento Seguro com Server Action: Programar uma função assíncrona marcada com a diretiva "use server". A ação deve receber o FormData enviado pelo formulário, e capturar os campos Nome, Tipo de Manifestação (Elogio, Sugestão, Reclamação) e Mensagem. Realizar validação no servidor: rejeitar mensagens com menos de 10 caracteres retornando um objeto estruturado de erro.
2. Revalidação Imediata do Cache: Sendo os dados válidos, a Server Action deve persistir a manifestação em um repositório simulado em memória e disparar imediatamente a função revalidatePath('/ouvidoria'), garantindo a atualização instantânea do mural.
3. Feedback de Processamento: O formulário deve fornecer feedback de carregamento no botão de submissão (desabilitando o botão e alterando o texto para 'Registrando manifestação...') enquanto a promessa estiver pendente.
4. Exigência de Documentação de IA: Registrar na ficha os prompts utilizados para conceber a Server Action e descrever a estratégia adotada para evitar o recarregamento clássico da página HTML durante o envio."

### Prompt 2:

"todas as funcionalidades foram testadas e estão funcionando como esperado"

*(gerou a primeira versão da ficha, `FICHA_IA_Q4.md`)*

### Prompt 3:

"antes de irmos para a ultima questao, acho q temos q arrumar as fichas dos exercicios 2,3 e 4. Olhe como esta a do exercicio 1:"

*(anexo: a ficha da Questão 1; a IA reformatou esta ficha no mesmo modelo)*

---

## 2. MAPEAMENTO DE AUTORIA NO CÓDIGO FONTE

### Blocos gerados integralmente pela IA

| Arquivo | Linhas | Gerado no prompt |
|---|---|---|
| `app/ouvidoria/constantes.js` | 1 a ____ | 1 |
| `app/ouvidoria/store.js` | 1 a ____ | 1 |
| `app/ouvidoria/actions.js` | 1 a ____ | 1 |
| `app/ouvidoria/FormularioOuvidoria.js` | 1 a ____ | 1 |
| `app/ouvidoria/page.js` | 1 a ____ | 1 |
| `app/ouvidoria/ouvidoria.css` | 1 a ____ | 1 |

### Blocos gerados por IA e modificados pelo aluno

Linhas: 1 a ____ do arquivo `fichas/FICHA_IA_Q4.md` (a própria ficha).

**Descrição das alterações manuais:**

Nenhuma alteração manual no código do projeto. Na ficha, a estrutura e os textos de apoio foram gerados pela IA (Prompts 2 e 3), e eu preenchi a identificação, o modelo utilizado, os resultados dos testes e a assinatura.

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
| Validação no servidor | Enviei uma mensagem com menos de 10 caracteres | O botão ficou desabilitado com "Registrando manifestação..." e depois apareceu o erro em vermelho no campo; a manifestação não entrou no mural e os valores digitados foram mantidos |
| Persistência em memória e revalidação | Preenchi todos os campos corretamente e enviei | Apareceu "Manifestação registrada com sucesso!", o formulário foi limpo e a manifestação surgiu no topo do mural |
| Feedback no botão de envio | Observei o botão durante o envio | Ficou desabilitado e com o texto "Registrando manifestação..." enquanto a Server Action estava pendente |
| Sem recarregar a página | No Console, defini `window.teste = "ainda aqui"`, enviei uma manifestação válida e li `window.teste` de novo | O valor continuou lá, o que indica que a página não recarregou |
| Uma única rodada de rede | Na aba Network, limpei a lista e enviei o formulário | Apareceu uma requisição `POST` para `/ouvidoria` e nenhuma nova requisição de documento |
| Dados mantidos na memória | Recarreguei a página com F5 | As manifestações cadastradas continuaram no mural |

---

## 4. EXIGÊNCIA ESPECÍFICA DA QUESTÃO 4

**Prompts usados para conceber a Server Action:**
Prompt 1, itens 1 e 2 do enunciado (diretiva `"use server"`, leitura do `FormData`, validação no servidor e `revalidatePath`). A IA gerou, em `actions.js`, a função assíncrona `registrarManifestacao(estadoAnterior, formData)`, com `"use server"` no topo do arquivo. Ela lê `nome`, `tipo` e `mensagem` do `FormData` e valida no servidor. Se a mensagem tiver menos de 10 caracteres, retorna um objeto estruturado de erro (`{ ok: false, erros: { mensagem: ... }, valores }`). Se os dados forem válidos, grava no repositório em memória (`store.js`) e chama `revalidatePath('/ouvidoria')`. A ação tem um atraso simulado de 1,2 s, para o feedback do botão ficar visível.

**Estratégia adotada para evitar o recarregamento clássico da página HTML:**
O formulário é um Client Component que usa `<form action={formAction}>`, onde `formAction` vem do hook `useActionState`. Com isso o React intercepta o envio do formulário e chama a Server Action por `fetch` em segundo plano, em vez de deixar o navegador fazer o envio HTML padrão, que navegaria e recarregaria a página. Depois que a ação grava a manifestação e chama `revalidatePath('/ouvidoria')`, o Next.js devolve na mesma resposta a página já atualizada, e o mural é renderizado de novo no lugar, sem recarregar. O botão de envio usa `useFormStatus` para ficar desabilitado e mostrar "Registrando manifestação..." enquanto a ação está pendente. Para confirmar, defini uma variável no Console antes de enviar o formulário e, depois do envio, ela continuava lá, o que não aconteceria se a página tivesse recarregado.

---

*Declaro que as informações acima descrevem fielmente o uso de IA nesta questão.*

Assinatura: Matheus Costa Mendes  Data: 26 / 11 / 2026