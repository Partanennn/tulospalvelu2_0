import { ReactNode } from "react";

import "./globals.css";
import LogoSlider from "@/components/LogoSlider";

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = ({ children }: TulospalveluLayoutProps) => {
  return (
    <div>
      <LogoSlider />
      <main>{children}</main>
    </div>
  );
};

export default TulospalveluLayout;
