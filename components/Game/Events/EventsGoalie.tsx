import {
  GameReportGameLogsUpdateGK,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "@/components/MyImage";
import { Spacer } from "../GameEvents";
import EventContainer from "./EventContainer";
import EventTimer from "./EventTimer";

type EventsGoalieProps = {
  awayTeam: GameReportGamesUpdateTeam;
  event: GameReportGameLogsUpdateGK;
  homeTeam: GameReportGamesUpdateTeam;
  periodLength: number;
};

const EventsGoalie = ({
  event,
  awayTeam,
  homeTeam,
  periodLength,
}: EventsGoalieProps) => {
  const team = event.TeamId === awayTeam.Id ? awayTeam : homeTeam;
  console.log(team);
  return (
    <EventContainer>
      <EventTimer
        gameTime={event.GameTime}
        period={event.Period}
        periodLength={periodLength}
      />
      <MyImage src={`${IMAGE_URL}/${team.Image}`} alt="" />
      <div className="flex flex-row justify-center items-center">
        <div>
          Maaliin {event.GoalkeeperName} #{event.GoalkeeperJersey}
        </div>
        <Spacer />
        <MyImage src={`${IMAGE_URL}/${team.Image}`} alt="" />
      </div>
    </EventContainer>
  );
};

export default EventsGoalie;
