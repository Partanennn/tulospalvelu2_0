"use client";

import {
  getGroupsAction,
  getLevelsAction,
  getSeasonsAction,
} from "@/app/actions";
import useFetch from "@/hooks/useFetch";
import { Group, useGroupStore } from "@/stores/group-store";
import { Level, useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import { useEffect } from "react";
import Select from "../Select";

const DEFAULT_SEASON: Season = {
  SeasonName: "2024-2025",
  SeasonNumber: "2025",
};
const DEFAULT_LEVEL: Level = { LevelID: "65", LevelName: "Mestis" };
const DEFAULT_GROUP: Group = { StatGroupID: "168", StatGroupName: "Mestis" };

const DataSelector = () => {
  const { levels, selectedLevel, updateLevels, updateSelectedLevel } =
    useLevelStore();
  const { selectedSeason, seasons, updateSelectedSeason, updateSeasons } =
    useSeasonStore();
  const { groups, selectedGroup, updateGroups, updateSelectedGroup } =
    useGroupStore();

  const { data: groupsData } = useFetch<Group[]>("/api/groups", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      levelId: selectedLevel?.LevelID ?? "65",
    }),
  });

  useEffect(() => {
    const getSeasonsValues = async () => {
      // GET COOKIES

      const seasonsData = await getSeasonsAction();
      const seasonValue = DEFAULT_SEASON;

      const levelsData = await getLevelsAction(seasonValue);
      const levelValue = DEFAULT_LEVEL;

      const groupsData = await getGroupsAction(seasonValue, levelValue);
      const groupValue = DEFAULT_GROUP;

      if (seasonsData) {
        updateSeasons(seasonsData);
        updateSelectedSeason(seasonValue);
      }

      if (levelsData) {
        updateLevels(levelsData);
        updateSelectedLevel(levelValue);
      }

      if (groupsData) {
        updateGroups(groupsData);
        updateSelectedGroup(groupValue);
      }
    };
    getSeasonsValues();
  }, []);

  useEffect(() => {
    if (selectedSeason) {
      const getLevels = async () => {
        const data = await getLevelsAction(selectedSeason ?? DEFAULT_LEVEL);

        if (data) {
          updateLevels(data);

          if (selectedLevel !== DEFAULT_LEVEL) {
            updateSelectedLevel(data[0]);
          }
        }
      };
      getLevels();
    }
  }, [selectedSeason]);

  useEffect(() => {
    if (groupsData) {
      const getGroups = async () => {
        const data = await getGroupsAction(
          selectedSeason ?? DEFAULT_SEASON,
          selectedLevel ?? DEFAULT_LEVEL
        );

        if (data) {
          updateGroups(data);

          if (selectedGroup !== DEFAULT_GROUP) {
            updateSelectedGroup(data[0]);
          }
        }
      };
      getGroups();
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
