import { ReactNode } from "react";
import "./globals.css";

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = ({ children }: TulospalveluLayoutProps) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default TulospalveluLayout;
