"use client";
import leijonaPNG from "@/assets/Logos/leijona.png";
import { navbarGroups, navbarSeries } from "@/utils/mockData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import TextButton from "./Buttons/TextButton";
import Select from "./Select";

interface NavBarProps {
  seasons: string[];
  levels: string[];
  groups: string[];
}

const NavBar = ({ seasons, levels, groups }: NavBarProps) => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [selectedLevel, setSelectedLevels] = useState(levels[0]);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const router = useRouter();

  return (
    <div className="flex bg-primary-800 text-white justify-between py-5">
      <div className="flex flex-row gap-[3rem]">
        <Image className="ml-4" src={leijonaPNG} alt="leijona" width={63} />
        <div className="flex gap-[3rem] items-center">
          <Select values={seasons} setSelectedValue={setSelectedSeason} />
          <Select values={levels} setSelectedValue={setSelectedLevels} />
          <Select values={groups} setSelectedValue={setSelectedGroup} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-lg gap-[8rem] mx-[6rem]">
        <TextButton value="Etusivu" onClick={() => router.push("/")} />
        <TextButton value="Otteluohjelma" onClick={() => router.push("/")} />
        <TextButton value="Pelaajat" onClick={() => router.push("/")} />
        <TextButton value="Tilastot" onClick={() => router.push("/")} />
      </div>
    </div>
  );
};

export default NavBar;
