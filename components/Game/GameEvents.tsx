import {
  GameReportGameLogsUpdateGK,
  GameReportGameLogsUpdateGoal,
  GameReportGameLogsUpdatePenalty,
  GameReportGameLogsUpdateTimeout,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import EventsGoal from "./Events/EventsGoal";
import EventsGoalie from "./Events/EventsGoalie";
import EventsPenalty from "./Events/EventsPenalty";
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

export const Spacer = () => <div className="px-10"></div>;

const GameEvents = ({
  gameEvents,
  awayTeam,
  homeTeam,
  periodLength,
}: GameEventsProps) => {
  const items = gameEvents.map((event) => {
    switch (event.Type) {
      case "GK_change":
      case "GK_start":
        return <EventsGoalie event={event} />;
      case "Goal":
        return (
          <EventsGoal
            event={event}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            periodLength={periodLength}
          />
        );
      case "Penalty":
        return (
          <EventsPenalty
            event={event}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            periodLength={periodLength}
          />
        );
      case "Timeout":
        return <EventsTimeout event={event} />;
      default:
        <></>;
        break;
    }
  });

  return <div>{items}</div>;
};

export default GameEvents;
