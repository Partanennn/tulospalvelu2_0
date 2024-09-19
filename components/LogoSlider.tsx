"use client";

import { useStandingStore } from "@/stores/standing-store";
import Image from "next/image";

const LogoSlider = () => {
  const { standing } = useStandingStore();

  const getLogo = async (imageUrl: string) => {
    const res = await fetch("/api/logo", {
      method: "POST",
      body: JSON.stringify({ url: imageUrl }),
    });

    const blob = await res.blob();
    const imageObject = URL.createObjectURL(blob);
    return imageObject;
  };

  const logos = standing?.Teams.map((team) => {
    getLogo(team.TeamImg);
    return (
      <Image
        key={team.UniqueID}
        src={`https://tulospalvelu.leijonat.fi/images/associations/weblogos/200x200/${team.TeamImg}`}
        alt={team.TeamAbbrv}
        width={50}
        height={50}
      />
    );
  });

  return (
    <div className="flex flex-row grow w-full justify-evenly my-3">{logos}</div>
  );
};

export default LogoSlider;
