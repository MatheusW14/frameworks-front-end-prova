"use client";

import "./projetos.css";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const AREAS = ["Frontend", "Backend", "Mobile", "DevOps"];
const CHAVE = "projetos-integradores";
const MIN_NOME = 5;

const EXEMPLOS = [
  { id: 1, nome: "Portal de Notas", area: "Frontend", prazo: "2026-12-15" },
  { id: 2, nome: "API de Matrículas", area: "Backend", prazo: "2027-02-10" },
  { id: 3, nome: "App de Frequência", area: "Mobile", prazo: "2027-03-01" },
];

function formatarData(iso) {
  if (!iso) return "";
  const [ano, mes, dia] = iso.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function ProjetosPage() {
  // Dados
  const [projetos, setProjetos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  // Formulário controlado
  const [nome, setNome] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [prazo, setPrazo] = useState("");
  const [nomeTocado, setNomeTocado] = useState(false);
  const [prazoTocado, setPrazoTocado] = useState(false);

  // Filtros
  const [busca, setBusca] = useState("");
  const [areaFiltro, setAreaFiltro] = useState("Todas");

  // Carrega do localStorage uma única vez, ao montar o componente
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(CHAVE);
      setProjetos(salvo ? JSON.parse(salvo) : EXEMPLOS);
    } catch {
      setProjetos(EXEMPLOS);
    }
    setCarregado(true);
  }, []);

  // Salva sempre que a lista mudar. A flag "carregado" evita que a lista
  // vazia inicial sobrescreva os dados salvos antes de eles serem lidos.
  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(CHAVE, JSON.stringify(projetos));
    } catch {
      // armazenamento indisponível: a página continua funcionando
    }
  }, [projetos, carregado]);

  // Validação em tempo real
  const nomeLimpo = nome.trim();
  const nomeInvalido = nomeLimpo.length < MIN_NOME;
  const prazoInvalido = prazo === "";
  const mostrarErroNome = nomeInvalido && (nomeTocado || nome.length > 0);
  const mostrarErroPrazo = prazoInvalido && prazoTocado;
  const formularioValido = !nomeInvalido && !prazoInvalido;

  // Filtragem: só recalcula quando a lista ou os filtros mudam.
  // Digitar no formulário (nome, area, prazo) não está no array de
  // dependências, então não dispara este cálculo.
  const projetosFiltrados = useMemo(() => {
    console.log("useMemo: filtrando...");
    const termo = busca.trim().toLowerCase();
    return projetos.filter((p) => {
      const bateTexto = p.nome.toLowerCase().includes(termo);
      const bateArea = areaFiltro === "Todas" || p.area === areaFiltro;
      return bateTexto && bateArea;
    });
  }, [projetos, busca, areaFiltro]);

  function cadastrar(e) {
    e.preventDefault();
    setNomeTocado(true);
    setPrazoTocado(true);
    if (!formularioValido) return;

    setProjetos((atual) => [
      { id: Date.now(), nome: nomeLimpo, area, prazo },
      ...atual,
    ]);
    setNome("");
    setArea(AREAS[0]);
    setPrazo("");
    setNomeTocado(false);
    setPrazoTocado(false);
  }

  function remover(id) {
    setProjetos((atual) => atual.filter((p) => p.id !== id));
  }

  return (
    <main className="proj-pagina">
      <div className="proj-conteudo">
        <Link href="/">← Painel da prova</Link>
        <h1>Painel de Projetos Integradores</h1>
        <p className="proj-sub">
          Cadastre e acompanhe os projetos do curso de ADS. Os dados ficam salvos neste navegador.
        </p>

        <section className="proj-cartao" aria-labelledby="titulo-cadastro">
          <h2 id="titulo-cadastro">Novo projeto</h2>
          <form onSubmit={cadastrar} noValidate className="proj-form">
            <div className="proj-campo">
              <label htmlFor="nome">Nome do projeto</label>
              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                onBlur={() => setNomeTocado(true)}
                aria-invalid={mostrarErroNome ? "true" : "false"}
                aria-describedby={mostrarErroNome ? "nome-erro" : "nome-ajuda"}
                className={mostrarErroNome ? "invalido" : ""}
                autoComplete="off"
              />
              <p id="nome-ajuda" className="proj-ajuda">Mínimo de {MIN_NOME} caracteres.</p>
              {mostrarErroNome && (
                <p id="nome-erro" className="proj-erro" role="alert">
                  O nome precisa ter pelo menos {MIN_NOME} caracteres (agora tem {nomeLimpo.length}).
                </p>
              )}
            </div>

            <div className="proj-campo">
              <label htmlFor="area">Área temática</label>
              <select id="area" value={area} onChange={(e) => setArea(e.target.value)}>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="proj-campo">
              <label htmlFor="prazo">Prazo de conclusão</label>
              <input
                id="prazo"
                type="date"
                value={prazo}
                onChange={(e) => setPrazo(e.target.value)}
                onBlur={() => setPrazoTocado(true)}
                aria-invalid={mostrarErroPrazo ? "true" : "false"}
                aria-describedby={mostrarErroPrazo ? "prazo-erro" : undefined}
                className={mostrarErroPrazo ? "invalido" : ""}
              />
              {mostrarErroPrazo && (
                <p id="prazo-erro" className="proj-erro" role="alert">
                  Informe o prazo de conclusão.
                </p>
              )}
            </div>

            <button type="submit" className="proj-botao" disabled={!formularioValido}>
              Cadastrar projeto
            </button>
          </form>
        </section>

        <section className="proj-cartao" aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">Projetos cadastrados</h2>

          <div className="proj-filtros">
            <div className="proj-campo">
              <label htmlFor="busca">Buscar por nome</label>
              <input
                id="busca"
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Digite para filtrar"
              />
            </div>
            <div className="proj-campo">
              <label htmlFor="filtro-area">Filtrar por área</label>
              <select
                id="filtro-area"
                value={areaFiltro}
                onChange={(e) => setAreaFiltro(e.target.value)}
              >
                <option value="Todas">Todas</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
          </div>

          <p className="proj-contagem" aria-live="polite">
            {carregado
              ? `Exibindo ${projetosFiltrados.length} de ${projetos.length} projeto(s).`
              : "Carregando projetos..."}
          </p>

          {carregado && projetosFiltrados.length === 0 ? (
            <p className="proj-vazio">Nenhum projeto encontrado com esses filtros.</p>
          ) : (
            <ul className="proj-lista">
              {projetosFiltrados.map((p) => (
                <li key={p.id} className="proj-item">
                  <div>
                    <strong>{p.nome}</strong>
                    <span className="proj-meta">
                      <span className="proj-chip">{p.area}</span>
                      Prazo: {formatarData(p.prazo)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="proj-remover"
                    onClick={() => remover(p.id)}
                    aria-label={`Remover o projeto ${p.nome}`}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}