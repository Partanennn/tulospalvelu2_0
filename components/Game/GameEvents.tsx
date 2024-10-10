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
            key={`goalie-${event.Key}`}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            event={event}
            periodLength={periodLength}
          />
        );
      case "Goal":
        return (
          <EventsGoal
            key={`goal-${event.Key}`}
            event={event}
            awayTeam={awayTeam}
            homeTeam={homeTeam}
            periodLength={periodLength}
          />
        );
      case "Penalty":
        return (
          <EventsPenalty
            key={`penalty-${event.Key}`}
            event={event}
            team={event.TeamId === homeTeam.Id ? homeTeam : awayTeam}
            periodLength={periodLength}
          />
        );
      case "Timeout":
        return (
          <EventsTimeout
            key={`timeout-${event.TeamId}`}
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

  return <div className="flex flex-col gap-3">{items}</div>;
};

export default GameEvents;
