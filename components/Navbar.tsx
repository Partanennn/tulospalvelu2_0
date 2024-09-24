"use client";
import { Level } from "@/app/api/levels/route";
import HamburgerIcon from "@/assets/Logos/Hamburger.png";
import useFetch from "@/hooks/useFetch";
import { Group, useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import { navbarItems } from "@/utils/navItems";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextButton from "./Buttons/TextButton";
import MyImage from "./MyImage";
import Select from "./Select";

const NavBar = () => {
  const [selectedPage, setSelectedPage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();
  const router = useRouter();

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
      onClick={() => {
        router.push(item.url);
        setIsMenuOpen(false);
      }}
    />
  ));

  return (
    <div className="flex flex-col items-center bg-primary-800 text-white justify-evenly py-5 gap-5 2xl:flex-row">
      <div className="flex flex-row gap-[3rem]">
        <div className="flex flex-wrap flex-col 2xl:flex-row gap-[3rem] justify-center items-center">
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
        </div>
      </div>
      <div className="hidden flex-row justify-between items-center text-lg gap-[3rem] mx-[6rem] 2xl:flex">
        {navItems}
      </div>
      <div className="flex justify-center px-5 2xl:hidden">
        <MyImage
          alt="Hamburger menu"
          src={HamburgerIcon}
          width={40}
          onClick={() => setIsMenuOpen((oldValue) => !oldValue)}
        />
        {isMenuOpen && (
          <div className="flex flex-col bg-primary-600 gap-3 p-4 mt-10 rounded-md absolute 2xl:hidden">
            {navItems}
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
