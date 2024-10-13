import {
  GameReportGamesUpdateTeam,
  GameReportPeriodSummary,
  PeriodGoals,
  PeriodPenMins,
  PeriodSaves,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "../MyImage";
import Cell from "../Table/Cell";
import TableHeader from "../Table/TableHeader";
import TableRow from "../Table/TableRow";
import TableTitleRow from "../Table/TableTitleRow";

type GameBoxScoreProps = {
  awayTeam: GameReportGamesUpdateTeam;
  events: GameReportPeriodSummary;
  homeTeam: GameReportGamesUpdateTeam;
};

const GameBoxScore = ({ awayTeam, events, homeTeam }: GameBoxScoreProps) => {
  const periodsPlayed = parseInt(events.PlayedPeriods);

  const getGoals = (goals: PeriodGoals[], period: number) => {
    if (periodsPlayed < period) {
      return { home: "-", away: "-" };
    }

    const goalValues = goals[period - 1].Goals.split("-");
    return { home: goalValues[0], away: goalValues[1] };
  };

  const getTotalGoals = (goals: PeriodGoals[]) => {
    const goalValues = goals[periodsPlayed].Goals.split("-");

    return { home: goalValues[0], away: goalValues[1] };
  };

  const getSaves = (goals: PeriodSaves[], period: number) => {
    if (periodsPlayed < period) {
      return { home: "-", away: "-" };
    }

    const savesValues = goals[period - 1].Saves.split("-");
    return { home: savesValues[0], away: savesValues[1] };
  };

  const getTotalSaves = (goals: PeriodSaves[]) => {
    const savesValues = goals[periodsPlayed].Saves.split("-");

    return { home: savesValues[0], away: savesValues[1] };
  };

  const getPenalties = (goals: PeriodPenMins[], period: number) => {
    if (periodsPlayed < period) {
      return { home: "-", away: "-" };
    }

    const penaltyValues = goals[period - 1].PenMins.split("-");
    return { home: penaltyValues[0], away: penaltyValues[1] };
  };

  const getTotalPenalties = (goals: PeriodPenMins[]) => {
    const penaltyValues = goals[periodsPlayed].PenMins.split("-");

    return { home: penaltyValues[0], away: penaltyValues[1] };
  };

  return (
    <div>
      <table>
        <thead>
          <TableTitleRow>
            <TableHeader colSpan={6}>Maalit</TableHeader>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow className="font-semibold">
            <Cell> </Cell>
            <Cell> </Cell>
            <Cell>1.</Cell>
            <Cell>2.</Cell>
            <Cell>3.</Cell>
            <Cell>Yht.</Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={homeTeam.Name}
                src={`${IMAGE_URL}/${homeTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {homeTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getGoals(events?.PeriodGoals, 1).home}</Cell>
            <Cell>{getGoals(events?.PeriodGoals, 2).home}</Cell>
            <Cell>{getGoals(events?.PeriodGoals, 3).home}</Cell>
            <Cell className="font-semibold">
              {getTotalGoals(events?.PeriodGoals).home}
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={awayTeam.Name}
                src={`${IMAGE_URL}/${awayTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {awayTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getGoals(events?.PeriodGoals, 1).away}</Cell>
            <Cell>{getGoals(events?.PeriodGoals, 2).away}</Cell>
            <Cell>{getGoals(events?.PeriodGoals, 3).away}</Cell>
            <Cell className="font-semibold">
              {getTotalGoals(events?.PeriodGoals).away}
            </Cell>
          </TableRow>
        </tbody>
      </table>
      <table>
        <thead>
          <TableTitleRow>
            <TableHeader colSpan={6}>Torjunnat</TableHeader>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow className="font-semibold">
            <Cell> </Cell>
            <Cell> </Cell>
            <Cell>1.</Cell>
            <Cell>2.</Cell>
            <Cell>3.</Cell>
            <Cell>Yht.</Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={homeTeam.Name}
                src={`${IMAGE_URL}/${homeTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {homeTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getSaves(events?.PeriodSaves, 1).home}</Cell>
            <Cell>{getSaves(events?.PeriodSaves, 2).home}</Cell>
            <Cell>{getSaves(events?.PeriodSaves, 3).home}</Cell>
            <Cell className="font-semibold">
              {getTotalSaves(events?.PeriodSaves).home}
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={awayTeam.Name}
                src={`${IMAGE_URL}/${awayTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {awayTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getSaves(events?.PeriodSaves, 1).away}</Cell>
            <Cell>{getSaves(events?.PeriodSaves, 2).away}</Cell>
            <Cell>{getSaves(events?.PeriodSaves, 3).away}</Cell>
            <Cell className="font-semibold">
              {getTotalSaves(events?.PeriodSaves).away}
            </Cell>
          </TableRow>
        </tbody>
      </table>
      <table>
        <thead>
          <TableTitleRow>
            <TableHeader colSpan={6}>Jäähyt</TableHeader>
          </TableTitleRow>
        </thead>
        <tbody>
          <TableRow className="font-semibold">
            <Cell> </Cell>
            <Cell> </Cell>
            <Cell>1.</Cell>
            <Cell>2.</Cell>
            <Cell>3.</Cell>
            <Cell>Yht.</Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={homeTeam.Name}
                src={`${IMAGE_URL}/${homeTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {homeTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 1).home}</Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 2).home}</Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 3).home}</Cell>
            <Cell className="font-semibold">
              {getTotalPenalties(events?.PeriodPenMins).home}
            </Cell>
          </TableRow>
          <TableRow>
            <Cell>
              <MyImage
                alt={awayTeam.Name}
                src={`${IMAGE_URL}/${awayTeam.Image}`}
              />
            </Cell>
            <Cell className="font-semibold">
              {awayTeam.Name.substring(0, 3)}
            </Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 1).away}</Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 2).away}</Cell>
            <Cell>{getPenalties(events?.PeriodPenMins, 3).away}</Cell>
            <Cell className="font-semibold">
              {getTotalPenalties(events?.PeriodPenMins).away}
            </Cell>
          </TableRow>
        </tbody>
      </table>
    </div>
  );
};

export default GameBoxScore;
