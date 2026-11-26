import "./globals.css";
import BarraProva from "./components/BarraProva";

export const metadata = { title: "Prova · Frameworks Front-end" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <BarraProva />
        {children}
      </body>
    </html>
  );
}
