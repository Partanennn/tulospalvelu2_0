import {
  GameReportGameLogsUpdateGK,
  GameReportGameLogsUpdateGoal,
  GameReportGameLogsUpdatePenalty,
  GameReportGameLogsUpdateTimeout,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { ReactNode } from "react";
import EventsGoal from "./Events/EventsGoal";
import EventsGoalie from "./Events/EventsGoalie";
import EventsPenalty from "./Events/EventsPenalty";
import EventsPeriod from "./Events/EventsPeriod";
import EventsTimeout from "./Events/EventsTimeout";

type GameEventsProps = {
  gameEvents: (
    | GameReportGameLogsUpdateGK
    | GameReportGameLogsUpdateGoal
    | GameReportGameLogsUpdatePenalty
    | GameReportGameLogsUpdateTimeout
  )[];
  awayTeam: GameReportGamesUpdateTeam;
  homeTeam: GameReportGamesUpdateTeam;
  periodLength: number;
};

export const Spacer = () => <div className="px-5 xl:px-10"></div>;

const GameEvents = ({
  gameEvents,
  awayTeam,
  homeTeam,
  periodLength,
}: GameEventsProps) => {
  let period = 0;

  const items = gameEvents.map((event) => {
    const itemsToReturn: ReactNode[] = [];

    if (event.Period !== period) {
      period = event.Period;
      itemsToReturn.push(<EventsPeriod period={event.Period} />);
    }

    switch (event.Type) {
      case "GK_change":
        itemsToReturn.push(
          <EventsGoalie
            key={`goalie-${event.Key}`}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            event={event}
            periodLength={periodLength}
          />
        );
        break;
      case "Goal":
        itemsToReturn.push(
          <EventsGoal
            key={`goal-${event.Key}`}
            event={event}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            periodLength={periodLength}
          />
        );
        break;
      case "Penalty":
        itemsToReturn.push(
          <EventsPenalty
            key={`penalty-${event.Key}`}
            event={event}
            team={event.TeamId === homeTeam.Id ? homeTeam : awayTeam}
            periodLength={periodLength}
          />
        );
        break;
      case "Timeout":
        itemsToReturn.push(
          <EventsTimeout
            key={`timeout-${event.TeamId}`}
            event={event}
            periodLength={periodLength}
            team={event.TeamId === homeTeam.Id ? homeTeam : awayTeam}
          />
        );
        break;
      default:
        <></>;
        break;
    }

    return itemsToReturn;
  });

  return <div className="flex flex-col gap-3">{items}</div>;
};

export default GameEvents;
