"use client";

import { SerieInfo as SerieInfoType } from "@/app/api/serieInfo/route";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { ChildrenType } from "@/utils/types";
import TableHeaderRow from "./Table/TableHeaderRow";

const Row = ({ children }: ChildrenType) => {
  return <tr className="odd:bg-neutral-300 py-2">{children}</tr>;
};
const CellRight = ({ children }: ChildrenType) => (
  <td className="flex justify-end px-2 py-2">{children}</td>
);

const CellLeft = ({ children }: ChildrenType) => (
  <td className="py-2 px-2 text">{children}</td>
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
    <div>
      <table>
        <thead>
          <TableHeaderRow colSpan={2}>Sarja info</TableHeaderRow>
        </thead>
        <tbody>
          <Row>
            <CellLeft>Sarja alkaa</CellLeft>
            <CellRight>{data?.BeginDate}</CellRight>
          </Row>
          <Row>
            <CellLeft>Sarja päättyy</CellLeft>
            <CellRight>{data?.EndDate}</CellRight>
          </Row>
          <Row>
            <CellLeft>Yhteydenotto</CellLeft>
            <CellRight>
              <div className="flex flex-col justify-end items-end">
                <div>{data?.SerieManagerName}</div>
                <div>{data?.SerieManagerEmail}</div>
                <div>{data?.SerieManagerPhone}</div>
              </div>
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Kurinpito</CellLeft>
            <CellRight>{data?.DisciplinaryContact}</CellRight>
          </Row>
          <Row>
            <CellLeft>Erän pituus</CellLeft>
            <CellRight>
              {data?.GameRules?.PeriodLengthMinutes ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erien määrä</CellLeft>
            <CellRight>{data?.GameRules?.NumberOfPeriods} kpl</CellRight>
          </Row>
          <Row>
            <CellLeft>Pieni jäähy</CellLeft>
            <CellRight>
              {data?.GameRules?.MinorPenaltyLengthMinutes} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Iso jäähy</CellLeft>
            <CellRight>
              {data?.GameRules?.MajorPenaltyLengthMinutes} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erätauko</CellLeft>
            <CellRight>
              {data?.IntermissionTimeBetweenPeriods ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erätauko (Jatkoaika)</CellLeft>
            <CellRight>
              {data?.IntermissionTimeBetweenPeriods ?? 0} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Lämmittely</CellLeft>
            <CellRight>{data?.WarmUpTime ?? 0} min</CellRight>
          </Row>
          <Row>
            <CellLeft>Erotuomarimäärä</CellLeft>
            <CellRight>{data?.NumberOfReferees ?? 0}</CellRight>
          </Row>
          <Row>
            <CellLeft>Erotuomaritaso</CellLeft>
            <CellRight>Taso {data?.LevelOfReferees ?? 0}</CellRight>
          </Row>
        </tbody>
      </table>
      <table></table>
    </div>
  );
};

export default SerieInfo;
