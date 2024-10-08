import { GameReportGameLogsUpdateTimeout } from "@/app/_actions/gameDataAction";
import EventContainer from "./EventContainer";

type EventsTimeoutProps = {
  event: GameReportGameLogsUpdateTimeout;
};

const EventsTimeout = ({ event }: EventsTimeoutProps) => {
  return <EventContainer>Timeout</EventContainer>;
};

export default EventsTimeout;
