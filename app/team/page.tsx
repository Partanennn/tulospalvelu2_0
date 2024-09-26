"use client";

import useFetch from "@/hooks/useFetch";
import { useSeasonStore } from "@/stores/season-store";
import { useSearchParams } from "next/navigation";

const TeamPage = () => {
  const params = useSearchParams();
  const { selectedSeason } = useSeasonStore();

  const { data } = useFetch("/api/teaminfo", {
    method: "POST",
    body: JSON.stringify({
      teamid: params.get("teamid"),
      associationId: params.get("associationid"),
      seasonNumber: selectedSeason?.SeasonNumber,
    }),
  });
  return (
    <div>
      {data?.ContactPersons?.map((player) => (
        <p>{player.LastName}</p>
      ))}
    </div>
  );
};

export default TeamPage;
