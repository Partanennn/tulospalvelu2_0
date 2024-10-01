"use client";

import { useSearchParams } from "next/navigation";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import { useEffect, useState } from "react";
import {
  PlayerBasicInfo,
  playerBasicInfoAction,
} from "@/app/_actions/playerBasicInfoAction";
import TableRow from "../Table/TableRow";
import Cell from "../Table/Cell";

const PlayerStats = () => {
  const [basicInfo, setBasicInfo] = useState<PlayerBasicInfo | null>(null);
  const params = useSearchParams();

  useEffect(() => {
    if (params.get("playerid")) {
      const fetchData = async () => {
        const playerId = params.get("playerid");

        const data = await playerBasicInfoAction({
          playerId: playerId || "",
        });

        if (data) {
          setBasicInfo(data);
        }
      };
      fetchData();
    }
  }, [params]);

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader>Tiedot</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>
          <TableRow>
            <Cell>Pituus</Cell>
            <Cell>{basicInfo?.Height}</Cell>
          </TableRow>
          <TableRow>
            <Cell>Paino</Cell>
            <Cell>{basicInfo?.Weight}</Cell>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
