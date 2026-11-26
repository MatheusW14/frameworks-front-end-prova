import fs from "node:fs";
import path from "node:path";

const raiz = process.cwd();

// A questão está disponível quando a página da rota existe em app/<rota>/page.js
export function questaoDisponivel(rota) {
  return fs.existsSync(path.join(raiz, "app", rota, "page.js"));
}

export function caminhoFicha(numero) {
  return path.join(raiz, "fichas", `FICHA_IA_Q${numero}.md`);
}

// A ficha está disponível quando o arquivo fichas/FICHA_IA_Q<n>.md existe
export function fichaDisponivel(numero) {
  return fs.existsSync(caminhoFicha(numero));
}
