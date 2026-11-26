"use server";

import { revalidatePath } from "next/cache";
import { adicionarManifestacao } from "./store";
import { TIPOS, MIN_MENSAGEM } from "./constantes";

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Server Action: roda só no servidor. Recebe o estado anterior (useActionState)
// e o FormData do formulário.
export async function registrarManifestacao(estadoAnterior, formData) {
  // Atraso simulado do processamento, para o feedback do botão ficar visível.
  await esperar(1200);

  const nome = String(formData.get("nome") ?? "").trim();
  const tipo = String(formData.get("tipo") ?? "");
  const mensagem = String(formData.get("mensagem") ?? "").trim();
  const valores = { nome, tipo: TIPOS.includes(tipo) ? tipo : TIPOS[0], mensagem };

  // Validação no servidor: devolve um objeto estruturado de erro, sem gravar nada.
  const erros = {};
  if (nome.length < 2) {
    erros.nome = "Informe seu nome (mínimo de 2 caracteres).";
  }
  if (!TIPOS.includes(tipo)) {
    erros.tipo = "Escolha um tipo de manifestação válido.";
  }
  if (mensagem.length < MIN_MENSAGEM) {
    erros.mensagem = `A mensagem precisa ter pelo menos ${MIN_MENSAGEM} caracteres (agora tem ${mensagem.length}).`;
  }

  if (Object.keys(erros).length > 0) {
    return { ok: false, erros, valores, mensagem: "", enviadoEm: Date.now() };
  }

  // Dados válidos: grava no repositório e revalida o cache da rota.
  adicionarManifestacao({ nome, tipo, mensagem });
  revalidatePath("/ouvidoria");

  return {
    ok: true,
    erros: {},
    valores: { nome: "", tipo: TIPOS[0], mensagem: "" },
    mensagem: "Manifestação registrada com sucesso!",
    enviadoEm: Date.now(),
  };
}