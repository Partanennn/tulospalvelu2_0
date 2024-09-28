import LogoSlider from "@/components/LogoSlider";
import DataSelector from "@/components/Navigation/DataSelector";
import NavBar from "@/components/Navigation/Navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
        <div className="flex flex-col gap-5 bg-neutral-100">
          <NavBar />
          <DataSelector />
          {children}
        </div>
      </body>
    </html>
  );
};

export default TulospalveluLayout;
