"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cursos } from "./data";

const atalhos = [
  { href: "/", rotulo: "Início", icone: "⌂" },
  { href: "/cursos", rotulo: "Todos os cursos", icone: "☰" },
];

function ItemLink({ href, rotulo, icone, expandida, ativo }) {
  return (
    <li>
      <Link
        href={href}
        prefetch={true}
        title={rotulo}
        aria-label={rotulo}
        aria-current={ativo ? "page" : undefined}
      >
        <span className="icone" aria-hidden="true">{icone}</span>
        {expandida && <span>{rotulo}</span>}
      </Link>
    </li>
  );
}

export default function Sidebar() {
  // Estado local do Client Component: persiste porque o layout não é remontado
  const [expandida, setExpandida] = useState(true);
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${expandida ? "expandida" : "recolhida"}`}>
      <button
        type="button"
        onClick={() => setExpandida((v) => !v)}
        aria-expanded={expandida}
        aria-label={expandida ? "Recolher barra lateral" : "Expandir barra lateral"}
      >
        {expandida ? "« Recolher" : "»"}
      </button>

      <nav aria-label="Navegação do catálogo">
        <ul>
          {atalhos.map((a) => (
            <ItemLink key={a.href} {...a} expandida={expandida} ativo={pathname === a.href} />
          ))}
        </ul>

        {expandida && <p className="secao">Cursos</p>}

        <ul>
          {cursos.map((curso) => {
            const href = `/cursos/${curso.id}`;
            return (
              <ItemLink
                key={curso.id}
                href={href}
                rotulo={curso.titulo}
                icone={String(curso.id)}
                expandida={expandida}
                ativo={pathname === href}
              />
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
