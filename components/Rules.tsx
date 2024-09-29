"use client";

import { getSerieInfo, SerieInfo } from "@/app/_actions/serieInfoAction";
import { useGroupStore } from "@/stores/group-store";
import { useLevelStore } from "@/stores/level-store";
import { useSeasonStore } from "@/stores/season-store";
import { ChildrenType } from "@/utils/types";
import { useEffect, useState } from "react";
import TableHeader from "./Table/TableHeader";
import TableHeaderRow from "./Table/TableHeaderRow";

const Row = ({ children }: ChildrenType) => (
  <tr className="text-center odd:bg-neutral-300 even:bg-neutral-100">
    {children}
  </tr>
);

const Cell = ({ children }: ChildrenType) => (
  <td className="py-4 px-4">{children}</td>
);

const Rules = () => {
  const [data, setData] = useState<SerieInfo | null>(null);
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

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader colSpan={1}>Sarjan säännöt</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.ClockCountDirection
                ? "Laskeva kello"
                : "Nouseva kello"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.CoachChallenge
                ? "Valmentajan haasto"
                : "Ei valmentajan haastoa"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.HasExtraPeriod
                ? "Jatkoerä"
                : "Ei jatkoerää"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.HasOvertime
                ? "Jatkoaika"
                : "Ei jatkoaikaa"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.PlusMinus
                ? "+/- tilastot käytössä"
                : "+/- tilastot ei käytössä"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.ShootingMap
                ? "Laukaisukartta käytössä"
                : "Laukaisukartta ei käytössä"}
            </Cell>
          </Row>
          <Row>
            <Cell>
              {data?.GameRules && data?.GameRules.TimeOnIce
                ? "Aika jäällä käytössä"
                : "Aika jäällä ei käytössä"}
            </Cell>
          </Row>
        </tbody>
      </table>
    </div>
  );
};

export default Rules;
