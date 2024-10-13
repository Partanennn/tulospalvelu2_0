"use client";

import {
  getSerieInfo,
  SerieInfo as SerieInfoData,
} from "@/app/_actions/serieInfoAction";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { ChildrenType } from "@/utils/types";
import { useEffect, useState } from "react";
import TableHeader from "./Table/TableHeader";
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
  const [data, setData] = useState<SerieInfoData | null>(null);
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();
  const { selectedLevel } = useLevelStore();

  useEffect(() => {
    if (selectedSeason && selectedLevel && selectedGroup) {
      const getInfo = async () => {
        const data = await getSerieInfo(
          selectedSeason,
          selectedLevel,
          selectedGroup
        );

        if (data) {
          setData(data);
        }
      };
      getInfo();
    }
  }, [selectedSeason, selectedLevel, selectedGroup]);

  const getValue = (value?: string | number) =>
    value && (value === "0" || value === 0) ? "-" : value;

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader colSpan={2}>Sarja info</TableHeader>
          </TableHeaderRow>
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
              {getValue(data?.GameRules?.PeriodLengthMinutes)} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erien määrä</CellLeft>
            <CellRight>
              {getValue(data?.GameRules?.NumberOfPeriods)} kpl
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Pieni jäähy</CellLeft>
            <CellRight>
              {getValue(data?.GameRules?.MinorPenaltyLengthMinutes)} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Iso jäähy</CellLeft>
            <CellRight>
              {getValue(data?.GameRules?.MajorPenaltyLengthMinutes)} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erätauko</CellLeft>
            <CellRight>
              {getValue(data?.IntermissionTimeBetweenPeriods)} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Erätauko (Jatkoaika)</CellLeft>
            <CellRight>
              {getValue(data?.IntermissionTimeBetweenPeriods)} min
            </CellRight>
          </Row>
          <Row>
            <CellLeft>Lämmittely</CellLeft>
            <CellRight>{getValue(data?.WarmUpTime)} min</CellRight>
          </Row>
          <Row>
            <CellLeft>Erotuomarimäärä</CellLeft>
            <CellRight>{getValue(data?.NumberOfReferees)}</CellRight>
          </Row>
          <Row>
            <CellLeft>Erotuomaritaso</CellLeft>
            <CellRight>Taso {getValue(data?.LevelOfReferees)}</CellRight>
          </Row>
        </tbody>
      </table>
      <table></table>
    </div>
  );
};

export default SerieInfo;
