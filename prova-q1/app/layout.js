import "./globals.css";

export const metadata = { title: "Catálogo Acadêmico - TADS" };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
