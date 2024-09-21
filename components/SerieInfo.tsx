"use client";

import { SerieInfo as SerieInfoType } from "@/app/api/serieInfo/route";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import TableHeader from "./Table/TableHeader";
import { ReactNode } from "react";

type Row = {
  children: ReactNode;
};
const Row = ({ children }: Row) => {
  return <tr>{children}</tr>;
};

const SerieInfo = () => {
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();
  const { selectedLevel } = useLevelStore();

  const { data } = useFetch<SerieInfoType>("/api/serieInfo", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
      levelid: selectedLevel?.LevelID,
    }),
  });

  console.log("data: ", { data });

  return (
    <div className="mx-5 justify-center items-center flex">
      <table>
        <thead>
          <TableHeader colSpan={2}>Sarja info</TableHeader>
        </thead>
        <tbody>
          <Row>
            <td>Sarja alkaa</td>
            <td>{data?.BeginDate}</td>
          </Row>
          <Row>
            <td>Sarja päättyy</td>
            <td>{data?.EndDate}</td>
          </Row>
          <Row>
            <td>Yhteydenotto</td>
            <td>TEE LOPPUUN</td>
          </Row>
          <Row>
            <td>Kurinpito</td>
            <td>{data?.DisciplinaryContact}</td>
          </Row>
          <Row>
            <td>Erätauko</td>
            <td>{data?.IntermissionTimeBetweenPeriods ?? 0} min</td>
          </Row>
          <Row>
            <td>Erätauko (Jatkoaika)</td>
            <td>{data?.IntermissionTimeBetweenPeriods ?? 0} min</td>
          </Row>
          <Row>
            <td>Lämmittely</td>
            <td>{data?.WarmUpTime ?? 0} min</td>
          </Row>
          <Row>
            <td>Erotuomarimäärä</td>
            <td>{data?.NumberOfReferees ?? 0}</td>
          </Row>
          <Row>
            <td>Erotuomaritaso</td>
            <td>Taso {data?.LevelOfReferees ?? 0}</td>
          </Row>
          <Row>
            <td>Erän pituus</td>
            <td>{data?.GameRules?.PeriodLengthMinutes ?? 0} min</td>
          </Row>
          <Row>
            <td>Erien määrä</td>
            <td>{data?.GameRules?.NumberOfPeriods} kpl</td>
          </Row>
        </tbody>
      </table>
      <table></table>
    </div>
  );
};

export default SerieInfo;
