import {
  GameReportGameLogsUpdateTimeout,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "@/components/MyImage";
import EventContainer from "./EventContainer";
import EventTimer from "./EventTimer";

type EventsTimeoutProps = {
  event: GameReportGameLogsUpdateTimeout;
  periodLength: number;
  team: GameReportGamesUpdateTeam;
};

const EventsTimeout = ({ event, periodLength, team }: EventsTimeoutProps) => {
  return (
    <EventContainer className="justify-between" gap="gap-0">
      <EventTimer
        gameTime={event.GameTime}
        period={event.Period}
        periodLength={periodLength}
      />
      <div className="font-semibold text-heading5">Aikalisä</div>
      <MyImage alt={team.Name} src={`${IMAGE_URL}/${team.Image}`} />
    </EventContainer>
  );
};

export default EventsTimeout;
