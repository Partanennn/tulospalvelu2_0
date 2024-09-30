"use client";

import {
  getGroupsAction,
  getLevelsAction,
  getSeasonsAction,
} from "@/app/_actions/actions";
import { Group, useGroupStore } from "@/stores/group-store";
import { Level, useLevelStore } from "@/stores/level-store";
import { Season, useSeasonStore } from "@/stores/season-store";
import { getCookie, setCookie } from "@/utils/cookies";
import { useEffect, useState } from "react";
import Select from "../Select";

const DEFAULT_SEASON: Season = {
  SeasonName: "2024-2025",
  SeasonNumber: "2025",
};
const DEFAULT_LEVEL: Level = {
  LevelID: "65",
  LevelName: "Mestis",
};
const DEFAULT_GROUP: Group = {
  StatGroupID: "168",
  StatGroupName: "Mestis",
};

const DataSelector = () => {
  const [isLevelFirstFetch, setIsLevelFirstFetch] = useState(true);
  const [isGroupFirstFetch, setIsGroupFirstFetch] = useState(true);

  const { levels, selectedLevel, updateLevels, updateSelectedLevel } =
    useLevelStore();
  const { selectedSeason, seasons, updateSelectedSeason, updateSeasons } =
    useSeasonStore();
  const { groups, selectedGroup, updateGroups, updateSelectedGroup } =
    useGroupStore();

  useEffect(() => {
    // Set values from cookies on first fetch
    const getSeasonsValues = async () => {
      const seasonsData = await getSeasonsAction();
      const seasonCookie = getCookie<Season>("season") ?? DEFAULT_SEASON;

      const levelsData = await getLevelsAction(seasonCookie);
      const levelCookie = getCookie<Level>("level") ?? DEFAULT_LEVEL;

      const groupsData = await getGroupsAction(seasonCookie, levelCookie);
      const groupCookie = getCookie<Group>("group") ?? DEFAULT_GROUP;

      if (seasonsData) {
        updateSeasons(seasonsData);
        updateSelectedSeason(seasonCookie);
      }

      if (levelsData) {
        updateLevels(levelsData);
        updateSelectedLevel(levelCookie);
      }

      if (groupsData) {
        updateGroups(groupsData);
        updateSelectedGroup(groupCookie);
      }
    };
    getSeasonsValues();
  }, []);

  // Level handler
  useEffect(() => {
    if (selectedSeason) {
      const getLevels = async () => {
        const data = await getLevelsAction(selectedSeason);

        if (data) {
          updateLevels(data);

          // Don't overwrite selected level on first time
          if (isLevelFirstFetch) {
            setIsLevelFirstFetch(false);
          } else {
            updateSelectedLevel(data[0]);
          }
        }
      };
      getLevels();
    }
  }, [selectedSeason]);

  // Group handler
  useEffect(() => {
    if (selectedLevel && selectedSeason) {
      const getGroups = async () => {
        const seasonCookie = getCookie<Season>("season") ?? DEFAULT_SEASON;
        const levelCookie = getCookie<Level>("level") ?? DEFAULT_LEVEL;

        const data = await getGroupsAction(
          selectedSeason ?? seasonCookie,
          selectedLevel ?? levelCookie
        );

        if (data) {
          updateGroups(data);

          // Don't overwrite selected group on first time
          if (isGroupFirstFetch) {
            setIsGroupFirstFetch(false);
          } else {
            updateSelectedGroup(data[0]);
          }
        }
      };
      getGroups();
    }
  }, [selectedSeason, selectedLevel]);

  // Cookie update
  useEffect(() => {
    if (selectedSeason && selectedLevel && selectedGroup) {
      setCookie("season", selectedSeason);
      setCookie("level", selectedLevel);
      setCookie("group", selectedGroup);
    }
  }, [selectedSeason, selectedLevel, selectedGroup]);

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
