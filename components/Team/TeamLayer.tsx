"use client";

import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { Team, useTeamStatsStore } from "@/stores/team-stats-store";
import { TeamInfo } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ContactPersonTable from "./Tables/ContactPersonTable";
import PlayersTable from "./Tables/PlayersTable";
import TeamGamesTable from "./Tables/TeamGamesTable";
import TopScorersTable from "./Tables/TopScorersTable";

const TeamLayer = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const { selectedSeason } = useSeasonStore();
  const { selectedLevel } = useLevelStore();
  const { selectedGroup } = useGroupStore();
  const { teamStats } = useTeamStatsStore();

  const params = useSearchParams();
  const router = useRouter();

  const { data } = useFetch<TeamInfo>("/api/teaminfo", {
    method: "POST",
    body: JSON.stringify({
      teamId: params.get("teamid"),
      associationId: params.get("associationid"),
      seasonNumber: selectedSeason?.SeasonNumber,
    }),
  });

  useEffect(() => {
    if (params.get("teamid")) {
      const team = teamStats?.Teams.find(
        (team) => team.TeamID === params.get("teamid")
      );
      if (team) {
        setSelectedTeam(team);
      }
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [selectedGroup, selectedLevel, selectedSeason]);

  return (
    <div>
      <div className="text-2xl flex justify-center items-center pb-[5rem] pt-[5rem] font-semibold">
        {selectedTeam?.TeamAbbrv}
      </div>
      <div className="flex flex-col items-center flex-wrap justify-evenly md:items-start gap-5 md:flex-row">
        <PlayersTable data={data?.Players ?? []} />
        <TopScorersTable data={data?.TopScorers ?? []} />
        <ContactPersonTable data={data?.ContactPersons ?? []} />
        <TeamGamesTable data={data?.Games ?? []} />
      </div>
    </div>
  );
};

export default TeamLayer;
