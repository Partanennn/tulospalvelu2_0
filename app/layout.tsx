import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { ReactNode } from "react";
import "./globals.css";

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = async ({ children }: TulospalveluLayoutProps) => {
  return (
    <html>
      <body>
        <LogoSlider />
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default TulospalveluLayout;
