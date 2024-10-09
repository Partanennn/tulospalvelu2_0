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
        return (
          <EventsGoalie
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            event={event}
            periodLength={periodLength}
          />
        );
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
            team={event.TeamId === homeTeam.Id ? homeTeam : awayTeam}
            periodLength={periodLength}
          />
        );
      case "Timeout":
        return (
          <EventsTimeout
            event={event}
            periodLength={periodLength}
            team={event.TeamId === homeTeam.Id ? homeTeam : awayTeam}
          />
        );
      default:
        <></>;
        break;
    }
  });

  return <div>{items}</div>;
};

export default GameEvents;
