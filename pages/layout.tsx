import { ReactNode } from "react";

import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import "./globals.css";

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = ({ children }: TulospalveluLayoutProps) => {
  return (
    <div>
      <LogoSlider />
      <NavBar />
      <main>{children}</main>
      {/* FOOTER */}
    </div>
  );
};

export default TulospalveluLayout;
