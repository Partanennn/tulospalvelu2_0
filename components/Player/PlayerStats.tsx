"use client";

import { useSearchParams } from "next/navigation";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";

const PlayerStats = () => {
  const params = useSearchParams();

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow>
            <TableHeader>Tiedot</TableHeader>
          </TableHeaderRow>
        </thead>
        <tbody>
          <tr>
            <td>Pelinumero</td>
            <td>12</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStats;
