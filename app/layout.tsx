import LogoSlider from "@/components/LogoSlider";
import NavBar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import "./globals.css";

interface TulospalveluLayoutProps {
  children: ReactNode;
}

const TulospalveluLayout = async ({ children }: TulospalveluLayoutProps) => {
  return (
    <html>
      <Analytics />
      <SpeedInsights />
      <body>
        <LogoSlider />
        <NavBar />
        {children}
      </body>
    </html>
  );
};

export default TulospalveluLayout;
