"use client";
import leijonaPNG from "@/assets/Logos/leijona.png";
import { navbarGroups, navbarSeasons, navbarSeries } from "@/utils/mockData";
import Image from "next/image";
import { useState } from "react";
import Select from "./Select";

const NavBar = () => {
  const [selectedSeason, setSelectedSeason] = useState(navbarSeasons[0]);
  const [selectedSeries, setSelectedSeries] = useState(navbarSeries[0]);
  const [selectedGroup, setSelectedGroup] = useState(navbarGroups[0]);

  return (
    <div className="flex bg-primary-800 text-white justify-between py-5">
      <div className="flex flex-row gap-[3rem]">
        <Image className="ml-4" src={leijonaPNG} alt="leijona" width={63} />
        <Select values={navbarSeasons} setSelectedValue={setSelectedSeason} />
        <Select values={navbarSeries} setSelectedValue={setSelectedSeries} />
        <Select values={navbarGroups} setSelectedValue={setSelectedGroup} />
      </div>
      <div className="flex flex-row justify-between items-center text-lg gap-[8rem] mx-[6rem]">
        <div className="">Etusivu</div>
        <div className="">Otteluohjelma</div>
        <div className="">Joukkueet</div>
        <div className="">Pelaajat</div>
        <div className="">Tilastot</div>
      </div>
    </div>
  );
};

export default NavBar;
