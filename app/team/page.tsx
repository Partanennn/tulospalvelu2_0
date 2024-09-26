"use client";

import Cell from "@/components/Table/Cell";
import TableHeader from "@/components/Table/TableHeader";
import TableHeaderRow from "@/components/Table/TableHeaderRow";
import TableRow from "@/components/Table/TableRow";
import TableTitleRow from "@/components/Table/TableTitleRow";
import useFetch from "@/hooks/useFetch";
import { useSeasonStore } from "@/stores/season-store";
import { Team, useTeamStatsStore } from "@/stores/team-stats-store";
import {
  TeamInfo,
  TeamInfoContactPerson,
  TeamInfoGame,
  TeamInfoPlayer,
  TeamInfoTopScorer,
} from "@/utils/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const TeamPage = () => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [playersData, setPlayersData] = useState<TeamInfoPlayer[]>([]);
  const [topScorersData, setTopScorersData] = useState<TeamInfoTopScorer[]>([]);
  const [contactPersonsData, setContactPersonsData] = useState<
    TeamInfoContactPerson[]
  >([]);
  const [gamesData, setGamesData] = useState<TeamInfoGame[]>([]);

  const { selectedSeason } = useSeasonStore();
  const { teamStats } = useTeamStatsStore();

  const params = useSearchParams();

  const { data, error, isLoading } = useFetch<TeamInfo>("/api/teaminfo", {
    method: "POST",
    body: JSON.stringify({
      teamId: params.get("teamid"),
      associationId: params.get("associationid"),
      seasonNumber: selectedSeason?.SeasonNumber,
    }),
  });

  useEffect(() => {
    if (data) {
      setPlayersData(data.Players);
      setTopScorersData(data.TopScorers);
      setContactPersonsData(data.ContactPersons);
      setGamesData(data.Games);
    }
  }, [data]);

  const players = playersData
    .sort((a, b) => {
      if (parseInt(a.JerseyNr) < parseInt(b.JerseyNr)) {
        return -1;
      } else if (parseInt(a.JerseyNr) > parseInt(b.JerseyNr)) {
        return 1;
      }

      return 0;
    })
    .map((player) => (
      <TableRow key={player.PersonID}>
        <Cell>{player.JerseyNr}</Cell>
        <Cell>{player.LastName}</Cell>
        <Cell>{player.FirstName}</Cell>
        <Cell>{player.PlayerAge}</Cell>
        <Cell>{player.RoleName}</Cell>
      </TableRow>
    ));

  const topScorers = topScorersData
    .sort((a: TeamInfoTopScorer, b: TeamInfoTopScorer) => {
      if (a.Points > b.Points) {
        return -1;
      } else if (a.Points < b.Points) {
        return 11;
      }
      return 0;
    })
    .map((player) => (
      <TableRow key={player.PlayerID}>
        <Cell>
          {player.LastName} {player.FirstName}
        </Cell>
        <Cell>{player.Goals}</Cell>
        <Cell>{player.Assists}</Cell>
        <Cell className="font-bold">{player.Points}</Cell>
      </TableRow>
    ));

  const contactPersons = contactPersonsData.map((person) => (
    <TableRow key={`${person.FirstName}${person.LastName}${person.RoleName}`}>
      <Cell>{person.LastName}</Cell>
      <Cell>{person.FirstName}</Cell>
      <Cell>{person.RoleName}</Cell>
    </TableRow>
  ));

  const gameSchedule = gamesData.sort().map((game) => (
    <TableRow key={game.GameID}>
      <Cell>{game.GameDate}</Cell>
      <Cell>{game.HomeTeamAbbreviation}</Cell>
      <Cell>{game.AwayTeamAbbreviation}</Cell>
      <Cell>{game.HomeGoals}</Cell>
      <Cell>-</Cell>
      <Cell>{game.AwayGoals}</Cell>
    </TableRow>
  ));

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

  // ON ERROR, NOT FOUND PAGE

  return (
    <div>
      <div className="text-2xl flex justify-center items-center pb-[5rem] pt-[5rem] font-semibold">
        {selectedTeam?.TeamAbbrv}
      </div>
      <div className="flex flex-col items-center flex-wrap justify-evenly md:items-start gap-5 md:flex-row">
        <div>
          <table>
            <thead>
              <TableHeaderRow
                onClick={() => {
                  if (playersData && playersData.length > 0) {
                    setPlayersData([]);
                  } else if (
                    data &&
                    playersData &&
                    data.Players.length > 0 &&
                    playersData.length === 0
                  ) {
                    setPlayersData(data.Players);
                  }
                }}
              >
                <TableHeader colSpan={5}>Pelaajat</TableHeader>
              </TableHeaderRow>
              <TableTitleRow>
                <td></td>
                <Cell colSpan={2} className="text-center">
                  Pelaaja
                </Cell>
                <Cell>Ikä</Cell>
                <Cell>Rooli</Cell>
              </TableTitleRow>
            </thead>
            <tbody>{players}</tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <TableHeaderRow
                onClick={() => {
                  if (topScorersData && topScorersData.length > 0) {
                    setTopScorersData([]);
                  } else if (
                    data &&
                    topScorersData &&
                    data.TopScorers.length > 0 &&
                    topScorersData.length === 0
                  ) {
                    setTopScorersData(data.TopScorers);
                  }
                }}
              >
                <TableHeader colSpan={5}>Pistepörssi</TableHeader>
              </TableHeaderRow>
              <TableTitleRow>
                <Cell>Pelaaja</Cell>
                <Cell>Maalit</Cell>
                <Cell>Syötöt</Cell>
                <Cell>Pisteet</Cell>
              </TableTitleRow>
            </thead>
            <tbody>{topScorers}</tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <TableHeaderRow
                onClick={() => {
                  if (contactPersonsData && contactPersonsData.length > 0) {
                    setContactPersonsData([]);
                  } else if (
                    data &&
                    contactPersonsData &&
                    data.ContactPersons.length > 0 &&
                    contactPersonsData.length === 0
                  ) {
                    setContactPersonsData(data.ContactPersons);
                  }
                }}
              >
                <TableHeader colSpan={3}>Henkilöstö</TableHeader>
              </TableHeaderRow>
              <TableTitleRow>
                <Cell colSpan={2} className="text-center">
                  Pelaaja
                </Cell>
                <Cell>Rooli</Cell>
              </TableTitleRow>
            </thead>
            <tbody>{contactPersons}</tbody>
          </table>
        </div>
        <div>
          <table>
            <thead>
              <TableHeaderRow
                onClick={() => {
                  if (gamesData && gamesData.length > 0) {
                    setGamesData([]);
                  } else if (
                    data &&
                    gamesData &&
                    data.Games.length > 0 &&
                    gamesData.length === 0
                  ) {
                    setGamesData(data.Games);
                  }
                }}
              >
                <TableHeader colSpan={6}>Ottelut</TableHeader>
              </TableHeaderRow>
            </thead>
            <tbody>{gameSchedule}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
