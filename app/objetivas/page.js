import "./objetivas.css";
import Link from "next/link";
import { questoesObjetivas } from "./data";

export const metadata = { title: "Questões Objetivas · Prova" };

export default function ObjetivasPage() {
  return (
    <main className="obj-pagina">
      <div className="obj-conteudo">
        <Link href="/">← Painel da prova</Link>
        <h1>Parte I: Questões Objetivas</h1>
        <p className="obj-sub">
          Múltipla escolha com resposta única. A alternativa correta de cada questão está marcada.
        </p>

        {questoesObjetivas.map((q) => (
          <section key={q.numero} className="obj-questao" aria-labelledby={`questao-${q.numero}`}>
            <h2 id={`questao-${q.numero}`}>Questão {q.numero}</h2>
            <p className="obj-enunciado">{q.enunciado}</p>
            <ul className="obj-alternativas">
              {Object.entries(q.alternativas).map(([letra, texto]) => {
                const correta = letra === q.correta;
                return (
                  <li key={letra} className={`obj-alternativa ${correta ? "correta" : ""}`}>
                    <span className="obj-letra">{letra}</span>
                    <span>{texto}</span>
                    {correta && <span className="obj-marca">✓ Resposta correta</span>}
                  </li>
                );
              })}
            </ul>
            <p className="obj-explicacao"><strong>Por quê:</strong> {q.explicacao}</p>
          </section>
        ))}

        <section id="gabarito" className="obj-questao">
          <h2>Gabarito</h2>
          <table className="obj-tabela">
            <thead>
              <tr><th>Questão</th><th>Resposta</th></tr>
            </thead>
            <tbody>
              {questoesObjetivas.map((q) => (
                <tr key={q.numero}>
                  <td>{q.numero}</td>
                  <td>{q.correta}) {q.alternativas[q.correta]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}