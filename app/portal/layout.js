import "./portal.css";
import { AcessibilidadeProvider } from "../providers";

// Server Component. O provedor (Client Component) envolve a página recebida
// como children, e por isso a página continua sendo Server Component.
export default function PortalLayout({ children }) {
  return <AcessibilidadeProvider>{children}</AcessibilidadeProvider>;
}