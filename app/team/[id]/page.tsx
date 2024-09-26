"use client";

import useFetch from "@/hooks/useFetch";
import { useSeasonStore } from "@/stores/season-store";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const TeamIdPage = ({ params: { id } }: Props) => {
  const { selectedSeason } = useSeasonStore();
  const { data } = useFetch("/api/teaminfo", {
    method: "POST",
    body: JSON.stringify({
      teamid: id,
      seasonNumber: selectedSeason,
    }),
  });
  return <div>Team page::DDD {id}</div>;
};

export default TeamIdPage;
