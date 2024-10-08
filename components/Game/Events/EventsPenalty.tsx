import {
  GameReportGameLogsUpdatePenalty,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "@/components/MyImage";
import EventContainer from "./EventContainer";
import EventTimer from "./EventTimer";

type EventsPenaltyProps = {
  event: GameReportGameLogsUpdatePenalty;
  periodLength: number;
  team: GameReportGamesUpdateTeam;
};

const EventsPenalty = ({ event, periodLength, team }: EventsPenaltyProps) => {
  return (
    <EventContainer
      className={`${
        parseInt(event.PenaltyMinutesNumber) >= 5 ? "bg-detroit-red-100" : ""
      }`}
    >
      <EventTimer
        gameTime={event.GameTime}
        period={event.Period}
        periodLength={periodLength}
      />
      <div className="flex flex-row items-center gap-10">
        <MyImage src={`${IMAGE_URL}/${team.Image}`} alt={""} />
        <div>
          <div className="font-semibold">{event.PenaltyMinutes}</div>
          <div className="text-neutral-900">
            {event.Name} #{event.Jersey}, {event.PenaltyReasonsFI}
          </div>
        </div>
      </div>
    </EventContainer>
  );
};

export default EventsPenalty;
