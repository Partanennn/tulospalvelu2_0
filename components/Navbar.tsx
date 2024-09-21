"use client";
import { Level } from "@/app/api/levels/route";
import leijonaPNG from "@/assets/Logos/leijona.png";
import useFetch from "@/hooks/useFetch";
import { Group, useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import { navbarItems } from "@/utils/navItems";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextButton from "./Buttons/TextButton";
import Select from "./Select";

const NavBar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");

  const { levels, selectedLevel, updateLevels, updateSelectedLevel } =
    useLevelStore();
  const { selectedSeason, seasons, updateSelectedSeason, updateSeasons } =
    useSeasonStore();
  const { groups, selectedGroup, updateGroups, updateSelectedGroup } =
    useGroupStore();

  const { data: seasonsData } = useFetch<Season[]>("/api/seasons");
  const { data: levelsData } = useFetch<Level[]>("/api/levels", {
    method: "POST",
    body: JSON.stringify(selectedSeason?.SeasonNumber ?? "2025"),
  });
  const { data: groupsData } = useFetch<Group[]>("/api/groups", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      levelId: selectedLevel?.LevelID ?? "65",
    }),
  });

  useEffect(() => {
    if (seasonsData) {
      updateSeasons(seasonsData);
      const selected = seasonsData.length > 0 ? seasonsData[0] : null;
      updateSelectedSeason(selected);
    }
  }, [seasonsData, updateSelectedSeason, updateSeasons]);

  useEffect(() => {
    if (levelsData) {
      updateLevels(levelsData);

      const selected = levelsData.length > 0 ? levelsData[0] : null;
      updateSelectedLevel(selected);
    }
  }, [levelsData, updateSelectedLevel, updateLevels]);

  useEffect(() => {
    if (groupsData) {
      updateGroups(groupsData);
      const selected = groupsData.length > 0 ? groupsData[0] : null;
      updateSelectedGroup(selected);
    }
  }, [groupsData, updateGroups, updateSelectedGroup]);

  useEffect(() => {
    const match = navbarItems.find((item) => item.url === pathName);
    setSelectedPage(match?.text ?? "");
  }, [pathName]);

  const navItems = navbarItems.map((item) => (
    <TextButton
      key={item.text}
      value={item.text}
      isSelected={selectedPage === item.text}
      onClick={() => router.push(item.url)}
    />
  ));

  return (
    <div className="flex bg-primary-800 text-white justify-between py-5">
      <div className="flex flex-row gap-[3rem]">
        <Image className="ml-4" src={leijonaPNG} alt="leijona" width={63} />
        <div className="flex gap-[3rem] items-center">
          <Select
            value={selectedSeason?.SeasonName ?? ""}
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
            value={selectedLevel?.LevelName ?? ""}
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
            value={selectedGroup?.StatGroupName ?? ""}
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
          {/* <Button value="Hae" onClick={getStandings} /> */}
        </div>
      </div>
      <div className="flex flex-row justify-between items-center text-lg gap-[3rem] mx-[6rem]">
        {navItems}
      </div>
    </div>
  );
};

export default NavBar;
