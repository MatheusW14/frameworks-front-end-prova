"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cursos } from "./data";

export default function Sidebar() {
  const [expandida, setExpandida] = useState(true);
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${expandida ? "expandida" : "recolhida"}`}>
      <button
        type="button"
        onClick={() => setExpandida((v) => !v)}
        aria-expanded={expandida}
      >
        {expandida ? "« Recolher" : "»"}
      </button>

      <nav aria-label="Cursos do catálogo">
        <ul>
          {cursos.map((curso) => {
            const href = `/cursos/${curso.id}`;
            return (
              <li key={curso.id}>
                <Link
                  href={href}
                  prefetch={true}
                  title={curso.titulo}
                  aria-current={pathname === href ? "page" : undefined}
                >
                  {expandida ? curso.titulo : curso.id}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
