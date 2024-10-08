import { GameReportGameLogsUpdateGK } from "@/app/_actions/gameDataAction";
import EventContainer from "./EventContainer";

type EventsGoalieProps = {
  event: GameReportGameLogsUpdateGK;
};

const EventsGoalie = ({ event }: EventsGoalieProps) => {
  return <EventContainer>Goalie</EventContainer>;
};

export default EventsGoalie;
