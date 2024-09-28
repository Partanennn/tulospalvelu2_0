"use client";

import { Level } from "@/app/api/levels/route";
import useFetch from "@/hooks/useFetch";
import { Group, useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import { useEffect } from "react";
import Select from "../Select";

const DataSelector = () => {
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

  return (
    <div className="flex flex-wrap flex-col gap-[2rem] justify-center items-center 2xl:flex-row text-white">
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
          const selected = levels.find((level) => level.LevelName === value);
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
  );
};

export default DataSelector;
