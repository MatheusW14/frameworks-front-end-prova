import "./cursos.css";
import Sidebar from "./Sidebar";

// Layout aninhado (Server Component). Ele não é remontado ao navegar entre
// /cursos/1, /cursos/2 e /cursos/3, então o estado da Sidebar é preservado.
export default function CursosLayout({ children }) {
  return (
    <div className="cursos-layout">
      <Sidebar />
      <section className="conteudo">{children}</section>
    </div>
  );
}
