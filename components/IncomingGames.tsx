"use client";

import { GameDay } from "@/app/api/gamesPerDay/route";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import GamesTable from "./GamesTable";

const IncomingGames = () => {
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

  return <GamesTable data={data} header="Tulevat Ottelut" />;
};

export default IncomingGames;
