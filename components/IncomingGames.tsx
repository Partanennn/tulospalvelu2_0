"use client";

import { GameDay } from "@/app/api/gamesPerDay/route";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useEffect, useState } from "react";
import GamesTable from "./GamesTable";

const IncomingGames = () => {
  const [tempData, setTempData] = useState<GameDay[]>([]);
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data } = useFetch<GameDay[]>("/api/gamesPerDay", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      gameDays: "incoming",
    }),
  });

  useEffect(() => {
    if (data) {
      setTempData(data);
    }
  }, [data]);

  return (
    <GamesTable
      data={data}
      tempData={tempData}
      updateTempData={setTempData}
      header="Tulevat Ottelut"
    />
  );
};

export default IncomingGames;
