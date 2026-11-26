"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { registrarManifestacao } from "./actions";
import { TIPOS, MIN_MENSAGEM } from "./constantes";

const estadoInicial = {
  ok: false,
  erros: {},
  valores: { nome: "", tipo: TIPOS[0], mensagem: "" },
  mensagem: "",
  enviadoEm: 0,
};

// Precisa ser um componente filho do <form> para o useFormStatus enxergar o envio.
function BotaoEnviar() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="ouv-botao" disabled={pending} aria-disabled={pending}>
      {pending ? "Registrando manifestação..." : "Enviar manifestação"}
    </button>
  );
}

export default function FormularioOuvidoria() {
  // action={formAction}: o React intercepta o envio e chama a Server Action
  // por fetch, sem navegação nem recarregamento da página.
  const [estado, formAction] = useActionState(registrarManifestacao, estadoInicial);
  const { erros, valores } = estado;

  return (
    <form action={formAction} key={estado.enviadoEm} noValidate className="ouv-form">
      {estado.ok && (
        <p className="ouv-sucesso" role="status">{estado.mensagem}</p>
      )}

      <div className="ouv-campo">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          type="text"
          defaultValue={valores.nome}
          autoComplete="name"
          aria-invalid={erros.nome ? "true" : "false"}
          aria-describedby={erros.nome ? "nome-erro" : undefined}
          className={erros.nome ? "invalido" : ""}
        />
        {erros.nome && <p id="nome-erro" className="ouv-erro" role="alert">{erros.nome}</p>}
      </div>

      <div className="ouv-campo">
        <label htmlFor="tipo">Tipo de manifestação</label>
        <select
          id="tipo"
          name="tipo"
          defaultValue={valores.tipo}
          aria-invalid={erros.tipo ? "true" : "false"}
          aria-describedby={erros.tipo ? "tipo-erro" : undefined}
        >
          {TIPOS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {erros.tipo && <p id="tipo-erro" className="ouv-erro" role="alert">{erros.tipo}</p>}
      </div>

      <div className="ouv-campo">
        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={4}
          defaultValue={valores.mensagem}
          aria-invalid={erros.mensagem ? "true" : "false"}
          aria-describedby={erros.mensagem ? "mensagem-erro" : "mensagem-ajuda"}
          className={erros.mensagem ? "invalido" : ""}
        />
        <p id="mensagem-ajuda" className="ouv-ajuda">Mínimo de {MIN_MENSAGEM} caracteres.</p>
        {erros.mensagem && (
          <p id="mensagem-erro" className="ouv-erro" role="alert">{erros.mensagem}</p>
        )}
      </div>

      <BotaoEnviar />
    </form>
  );
}