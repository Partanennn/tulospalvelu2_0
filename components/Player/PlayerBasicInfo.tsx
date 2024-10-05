import { PlayerBasicInfo } from "@/app/_actions/playerBasicInfoAction";
import Cell from "../Table/Cell";
import TableHeader from "../Table/TableHeader";
import TableHeaderRow from "../Table/TableHeaderRow";
import TableRow from "../Table/TableRow";

type PlayerBasicInfoProps = {
  basicInfo: PlayerBasicInfo | null;
};

const BasicInfo = ({ basicInfo }: PlayerBasicInfoProps) => {
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
            <Cell>Syntymäaika</Cell>
            <Cell>{basicInfo?.Dob}</Cell>
          </TableRow>
          <TableRow>
            <Cell>Syntymäpaikka</Cell>
            <Cell>{basicInfo?.Pob}</Cell>
          </TableRow>
          <TableRow>
            <Cell>Joukkue</Cell>
            <Cell>{basicInfo?.AssociationName}</Cell>
          </TableRow>
          <TableRow>
            <Cell>Kansallisuus</Cell>
            <Cell>{basicInfo?.Nationality}</Cell>
          </TableRow>
          {parseInt(basicInfo?.Age ?? "0") > 14 && (
            <>
              <TableRow>
                <Cell>Pituus</Cell>
                <Cell>{basicInfo?.Height ?? 0} cm</Cell>
              </TableRow>
              <TableRow>
                <Cell>Paino</Cell>
                <Cell>{basicInfo?.Weight ?? 0} kg</Cell>
              </TableRow>
            </>
          )}
          <TableRow>
            <Cell>Kätisyys</Cell>
            <Cell>{basicInfo?.Hand ?? "Ei määritelty"}</Cell>
          </TableRow>
          <TableRow>
            <Cell>Ikä</Cell>
            <Cell>{basicInfo?.Age ?? 0} vuotta</Cell>
          </TableRow>
          <TableRow>
            <Cell>Varaus</Cell>
            <Cell>
              {basicInfo?.NHLDraft === null ? (
                "Ei varattu"
              ) : (
                <div>
                  {basicInfo?.NHLDraft.DraftYear},{" "}
                  {basicInfo?.NHLDraft.DraftedTeam},{" "}
                  {basicInfo?.NHLDraft.DraftRound}. kierros #
                  {basicInfo?.NHLDraft.DraftNumber}
                </div>
              )}
            </Cell>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
};

export default BasicInfo;
