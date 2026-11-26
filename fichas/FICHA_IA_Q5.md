# FICHA DE DOCUMENTAÇÃO DE USO DE IA

## RELATÓRIO DE TRANSPARÊNCIA E AUDITORIA DE IA GENERATIVA

**Identificação da Questão:** Questão Prática Nº: **[ 5 ]** (Portal Híbrido com Context API Global e Isolamento de Segurança)

**Estudante:** Matheus Costa Mendes

**R.A.:** 58381

**Ferramentas de IA Utilizadas:** [ ] ChatGPT  [ ] GitHub Copilot  **[X] Claude**  [ ] Gemini  [ ] Outra: ________

**Versão / Modelo Específico:** Claude (Anthropic), chat web/app. Modelo: Sonnet 5.5 médio

---

## 0. Observação de transparência (antes do Prompt 1)

Nenhuma mensagem anterior ao Prompt 1 tratou desta questão. Tudo que foi entregue está nos prompts 1 e 2.

---

## 1. HISTÓRICO COMPLETO DE PROMPTS ENVIADOS À IA

*(Transcrição literal e cronológica)*

### Prompt 1:

"Preciso construir um Portal Híbrido com Context API Global e Isolamento de Segurança

* Localização do Arquivo: app/portal/page.js (com suporte de contexto em app/providers.js).
* Conceitos Avaliados: Composição híbrida entre Server e Client Components (padrão children), Context API de preferências e proteção contra environment poisoning via server-only.

Enunciado: Construa a página inicial do Portal de Comunicados do IFMS unindo segurança no servidor e preferências dinâmicas de acessibilidade no cliente:

1. Contexto Global de Acessibilidade: Criar o arquivo app/providers.js marcado com "use client" contendo um AcessibilidadeContext. O contexto deve armazenar o estado de Alto Contraste (ativo/inativo) e Tamanho da Fonte (Normal/Ampliada), oferecendo botões de alternância. O provedor deve encapsular a aplicação através da propriedade children para não transformar os componentes filhos em Client Components.
2. Proteção Estrita contra Vazamento (server-only): A página app/portal/page.js deve ser um Server Component que consulta dados confidenciais de comunicados internos. A função de leitura de dados deve residir em um módulo de serviço protegido obrigatoriamente por import 'server-only';, assegurando que o código nunca seja empacotado para o cliente.
3. Composição de Interface: A tela deve renderizar no topo a barra de ferramentas de acessibilidade consumindo o contexto e, abaixo, o mural de avisos gerado diretamente no servidor.
4. Exigência de Documentação de IA: Documentar os prompts aplicados para resolver o aninhamento de Server Components dentro de Providers e demonstrar como foi comprovada a barreira de segurança imposta pelo pacote server-only."

### Prompt 2:

"realizei todos os testes e funcionou tudo corretamente"

*(gerou a primeira versão da ficha, `FICHA_IA_Q5.md`)*

---

## 2. MAPEAMENTO DE AUTORIA NO CÓDIGO FONTE

### Blocos gerados integralmente pela IA

| Arquivo | Linhas | Gerado no prompt |
|---|---|---|
| `app/providers.js` | 1 a 42 | 1 |
| `app/portal/layout.js` | 1 a 8 | 1 |
| `app/portal/comunicados.service.js` | 1 a 48 | 1 |
| `app/portal/BarraAcessibilidade.js` | 1 a 20 | 1 |
| `app/portal/page.js` | 1 a 47 | 1 |
| `app/portal/portal.css` | 1 a 41 | 1 |

Observação: a IA indicou o comando `npm install server-only`, que eu executei. Ele alterou o `package.json` e o `package-lock.json` automaticamente, sem edição manual minha nas linhas desses arquivos.

### Blocos gerados por IA e modificados pelo aluno

Linhas: 1 a 113 do arquivo `fichas/FICHA_IA_Q5.md` (a própria ficha).

**Descrição das alterações manuais:**

Nenhuma alteração manual permanente no código do projeto. Para o teste da barreira de segurança, adicionei temporariamente um `import` do módulo de serviço em um Client Component e removi em seguida. Na ficha, a estrutura e os textos de apoio foram gerados pela IA (Prompt 2), e eu preenchi a identificação, o modelo utilizado, os resultados dos testes e a assinatura.

### Blocos de autoria 100% exclusiva do estudante

Nenhum.

---

## 3. AUDITORIA E JUSTIFICATIVA TÉCNICA DO ESTUDANTE

**A IA cometeu erros de compilação ou sugeriu APIs legadas?** [ ] Sim  [X] Não

Marquei "Não" porque o código gerado funcionou ao rodar, sem erros de compilação ou de API. (confirmar)

**Em caso afirmativo, qual foi o erro e como você o solucionou?**

Não se aplica.

**Como você validou que a solução gerada atende com rigor técnico aos requisitos do enunciado?**

| Requisito do enunciado | Como testei | Resultado observado |
|---|---|---|
| Contexto de Alto Contraste | Abri `/portal` e cliquei no botão "Alto contraste" | A página ficou preta com texto amarelo e branco, inclusive o mural; o botão passou a mostrar "ativo" e voltou ao normal ao clicar de novo |
| Contexto de Tamanho da Fonte | Cliquei no botão "Fonte" | Os textos aumentaram e o botão passou a mostrar "ampliada"; ao clicar de novo, voltou ao tamanho normal |
| Mural gerado no servidor | Abri o código-fonte da página (Ctrl+U) e a aba Network | Os títulos e textos dos comunicados já estavam no HTML recebido do servidor  |
| Barreira do `server-only` | Importei temporariamente `comunicados.service.js` em um Client Component | O Next.js acusou erro de build, e a página só voltou a funcionar depois que removi o import. Ver seção 4 |
| Credencial não vai para o cliente | Rodei `npm run build` e procurei o texto da credencial na pasta `.next/static` | Nenhum arquivo continha o texto  |
| Composição Server + Client | Conferi onde aparece `"use client"` no código | Só `providers.js` e `BarraAcessibilidade.js` o possuem; `app/portal/page.js` não, e continua sendo Server Component |

---

## 4. EXIGÊNCIA ESPECÍFICA DA QUESTÃO 5

**Prompts usados para resolver o aninhamento de Server Components dentro de Providers:**
Prompt 1, itens 1 e 3 do enunciado (provedor com `children` e composição híbrida). A IA gerou o `AcessibilidadeProvider` em `app/providers.js`, marcado com `"use client"`, que recebe `children` e envolve o conteúdo com o `AcessibilidadeContext.Provider`. O `app/portal/layout.js` (Server Component) usa esse provedor e passa a página como `children`. Por isso `app/portal/page.js` continua sendo Server Component: ela chega ao provedor já renderizada pelo servidor, e não é importada dentro de um arquivo com `"use client"`. A barra de acessibilidade (`BarraAcessibilidade.js`) é o único Client Component, e consome o contexto pelo hook `useAcessibilidade`. O alto contraste e a fonte ampliada chegam ao mural por CSS, a partir de atributos `data-contraste` e `data-fonte` no elemento do provedor, sem transformar o mural em Client Component.

**Como foi comprovada a barreira de segurança do `server-only`:**
O módulo `app/portal/comunicados.service.js` começa com `import "server-only";` e guarda a função de leitura dos comunicados e uma credencial fictícia. Para provar a barreira, adicionei temporariamente em `BarraAcessibilidade.js` (um Client Component) o import `import { listarComunicados } from "./comunicados.service";`. Ao salvar, o Next.js acusou erro de build informando que o módulo `server-only` não pode ser importado em um Client Component, e apontou o arquivo do serviço. Depois removi a linha e a página voltou a funcionar. Também rodei `npm run build` e procurei o texto da credencial na pasta `.next/static`, onde ele não apareceu, o que confirma que o código do serviço não foi empacotado para o navegador.

---

*Declaro que as informações acima descrevem fielmente o uso de IA nesta questão.*

Assinatura: Matheus Costa Mendes  Data: 26 / 11 / 2026