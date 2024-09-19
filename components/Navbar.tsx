"use client";
import { Level } from "@/app/api/levels/route";
import leijonaPNG from "@/assets/Logos/leijona.png";
import { Group, useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Button from "./Buttons/Button";
import TextButton from "./Buttons/TextButton";
import Select from "./Select";

const NavBar = () => {
  const router = useRouter();
  const { levels, selectedLevel, updateLevels, updateSelectedLevel } =
    useLevelStore();
  const { selectedSeason, seasons, updateSelectedSeason, updateSeasons } =
    useSeasonStore();
  const { groups, selectedGroup, updateGroups, updateSelectedGroup } =
    useGroupStore();

  useEffect(() => {
    const getSeasons = async () => {
      const res = await fetch("/api/seasons");
      const newSeasons = (await res.json()) as Season[];
      updateSeasons(newSeasons);

      const selected = newSeasons.length > 0 ? newSeasons[0] : null;
      updateSelectedSeason(selected);
    };

    getSeasons();
  }, [updateSelectedSeason, updateSeasons]);

  useEffect(() => {
    const getLevels = async () => {
      const res = await fetch("/api/levels", {
        method: "POST",
        body: JSON.stringify(selectedSeason?.SeasonNumber ?? "2025"),
      });

      const newLevels = (await res.json()) as Level[];
      updateLevels(newLevels);

      const selected = newLevels.length > 0 ? newLevels[0] : null;
      updateSelectedLevel(selected);
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
      updateGroups(newGroups);
      const selected = newGroups.length > 0 ? newGroups[0] : null;
      updateSelectedGroup(selected);
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

    const games = await res.json();
    console.log("games: ", { games });
  };

  return (
    <div className="flex bg-primary-800 text-white justify-between py-5">
      <div className="flex flex-row gap-[3rem]">
        <Image className="ml-4" src={leijonaPNG} alt="leijona" width={63} />
        <div className="flex gap-[3rem] items-center">
          <Select
            values={seasons.map((season) => ({
              ...season,
              text: season.SeasonName,
              id: season.SeasonNumber,
            }))}
            setSelectedValue={(value) => {
              const selected = seasons.find(
                (season) => season.SeasonName === value
              );
              updateSelectedSeason(selected ?? seasons[0]);
            }}
          />
          <Select
            values={levels.map((level) => ({
              ...level,
              id: level.LevelID,
              text: level.LevelName,
            }))}
            setSelectedValue={(value) => {
              const selected = levels.find(
                (level) => level.LevelName === value
              );
              updateSelectedLevel(selected ?? levels[0]);
            }}
          />
          <Select
            values={groups.map((group) => ({
              ...group,
              id: group.StatGroupID,
              text: group.StatGroupName,
            }))}
            setSelectedValue={(value) => {
              const selected = groups.find(
                (group) => group.StatGroupName === value
              );
              updateSelectedGroup(selected ?? groups[0]);
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
