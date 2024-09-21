"use client";

import { SerieInfo as SerieInfoType } from "@/app/api/serieInfo/route";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { ReactNode } from "react";
import TableHeader from "./Table/TableHeader";

type ChildrenType = {
  children: ReactNode;
};
const Row = ({ children }: ChildrenType) => {
  return <tr>{children}</tr>;
};
const CellRight = ({ children }: ChildrenType) => (
  <td className="flex justify-end items-end">{children}</td>
);

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

  return (
    <div className="mx-5">
      <table>
        <thead>
          <tr>
            <TableHeader colSpan={2}>Sarja info</TableHeader>
          </tr>
        </thead>
        <tbody>
          <Row>
            <td>Sarja alkaa</td>
            <CellRight>{data?.BeginDate}</CellRight>
          </Row>
          <Row>
            <td>Sarja päättyy</td>
            <CellRight>{data?.EndDate}</CellRight>
          </Row>
          <Row>
            <td>Yhteydenotto</td>
            <CellRight>TEE LOPPUUN</CellRight>
          </Row>
          <Row>
            <td>Kurinpito</td>
            <CellRight>{data?.DisciplinaryContact}</CellRight>
          </Row>
          <Row>
            <td>Erätauko</td>
            <CellRight>
              {data?.IntermissionTimeBetweenPeriods ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <td>Erätauko (Jatkoaika)</td>
            <CellRight>
              {data?.IntermissionTimeBetweenPeriods ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <td>Lämmittely</td>
            <CellRight>{data?.WarmUpTime ?? 0} min</CellRight>
          </Row>
          <Row>
            <td>Erotuomarimäärä</td>
            <CellRight>{data?.NumberOfReferees ?? 0}</CellRight>
          </Row>
          <Row>
            <td>Erotuomaritaso</td>
            <CellRight>Taso {data?.LevelOfReferees ?? 0}</CellRight>
          </Row>
          <Row>
            <td>Erän pituus</td>
            <CellRight>
              {data?.GameRules?.PeriodLengthMinutes ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <td>Erien määrä</td>
            <CellRight>{data?.GameRules?.NumberOfPeriods} kpl</CellRight>
          </Row>
        </tbody>
      </table>
      <table></table>
    </div>
  );
};

export default SerieInfo;
