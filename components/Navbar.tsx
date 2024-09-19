"use client";
import { Group } from "@/app/api/groups/route";
import { Level } from "@/app/api/levels/route";
import { Season } from "@/app/api/seasons/route";
import leijonaPNG from "@/assets/Logos/leijona.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Buttons/Button";
import TextButton from "./Buttons/TextButton";
import Select from "./Select";

const NavBar = () => {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>({
    SeasonName: "2024-2025",
    SeasonNumber: "2025",
  });
  const [selectedLevel, setSelectedLevel] = useState<Level | null>();
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getSeasons = async () => {
      const res = await fetch("/api/seasons");
      const newSeasons = (await res.json()) as Season[];
      setSeasons(newSeasons);

      const selected = newSeasons.length > 0 ? newSeasons[0] : null;
      setSelectedSeason(selected);
    };

    getSeasons();
  }, []);

  useEffect(() => {
    const getLevels = async () => {
      const res = await fetch("/api/levels", {
        method: "POST",
        body: JSON.stringify({ seasonNumber: selectedSeason?.SeasonNumber }),
      });

      const newLevels = (await res.json()) as Level[];
      setLevels(newLevels);

      const selected = newLevels.length > 0 ? newLevels[0] : null;
      setSelectedLevel(selected);
    };
    getLevels();
  }, [selectedSeason]);

  useEffect(() => {
    const getGroups = async () => {
      const res = await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify({
          season: selectedSeason?.SeasonNumber,
          levelId: selectedLevel?.LevelID ?? "65",
        }),
      });

      const newGroups = (await res.json()) as Group[];
      setGroups(newGroups);
      const selected = newGroups.length > 0 ? newGroups[0] : null;
      setSelectedGroup(selected);
    };
    getGroups();
  }, [selectedSeason, selectedLevel]);

  const getGames = async () => {
    const res = await fetch("/api/gamesPerDay", {
      method: "POST",
      body: JSON.stringify({
        season: selectedSeason?.SeasonNumber,
        stgid: selectedGroup?.StatGroupID,
      }),
    });

    //const games = await res.json();
  };

  return (
    <div className="flex bg-primary-800 text-white justify-between py-5">
      <div className="flex flex-row gap-[3rem]">
        <Image className="ml-4" src={leijonaPNG} alt="leijona" width={63} />
        <div className="flex gap-[3rem] items-center">
          <Select
            values={seasons.map((season) => season.SeasonName)}
            setSelectedValue={(value) => {
              const selected = seasons.find(
                (season) => season.SeasonName === value
              );
              setSelectedSeason(selected ?? seasons[0]);
            }}
          />
          <Select
            values={levels.map((level) => level.LevelName)}
            setSelectedValue={(value) => {
              const selected = levels.find(
                (level) => level.LevelName === value
              );
              setSelectedLevel(selected ?? levels[0]);
            }}
          />
          <Select
            values={groups.map((group) => group.StatGroupName)}
            setSelectedValue={(value) => {
              const selected = groups.find(
                (group) => group.StatGroupName === value
              );
              setSelectedGroup(selected ?? groups[0]);
            }}
          />
          <Button value="Hae" onClick={getGames} />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-lg gap-[3rem] mx-[6rem]">
        <TextButton value="Etusivu" onClick={() => router.push("/")} />
        <TextButton value="Otteluohjelma" onClick={() => router.push("/")} />
        <TextButton value="Pelaajat" onClick={() => router.push("/")} />
        <TextButton value="Tilastot" onClick={() => router.push("/")} />
      </div>
    </div>
  );
};

export default NavBar;
