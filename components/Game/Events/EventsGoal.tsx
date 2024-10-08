import {
  GameReportGameLogsUpdateGoal,
  GameReportGamesUpdateTeam,
} from "@/app/_actions/gameDataAction";
import { IMAGE_URL } from "@/app/_lib/urls";
import MyImage from "@/components/MyImage";
import { Spacer } from "../GameEvents";
import EventContainer from "./EventContainer";
import EventTimer from "./EventTimer";

type EventsGoalProps = {
  awayTeam: GameReportGamesUpdateTeam;
  event: GameReportGameLogsUpdateGoal;
  homeTeam: GameReportGamesUpdateTeam;
  periodLength: number;
};

const EventsGoal = ({
  event,
  awayTeam,
  homeTeam,
  periodLength,
}: EventsGoalProps) => {
  const isHomeScorer = event.TeamId === homeTeam.Id;

  const header = (
    <EventContainer
      className={`flex flex-row gap-5 items-center ${
        isHomeScorer ? "bg-detroit-red-600" : "bg-toronto-blue-600"
      }  text-white px-10`}
    >
      <Spacer />
      <MyImage
        width={60}
        alt={homeTeam.Name}
        className={`${isHomeScorer ? "" : "opacity-50"}`}
        src={`${IMAGE_URL}/${homeTeam.Image}`}
      />
      <div className={`${isHomeScorer ? "" : "opacity-30"} text-heading4 px-3`}>
        {event.HomeTeamGoals}
      </div>
      <div className="text-heading6 px-10">Maali</div>
      <div className={`${isHomeScorer ? "opacity-30" : ""} text-heading4 px-3`}>
        {event.AwayTeamGoals}
      </div>
      <MyImage
        width={60}
        alt={homeTeam.Name}
        className={`${isHomeScorer ? "opacity-50" : ""}`}
        src={`${IMAGE_URL}/${awayTeam.Image}`}
      />
      <Spacer />
    </EventContainer>
  );
  const body = (
    <EventContainer>
      <EventTimer
        gameTime={event.GameTime}
        period={event.Period}
        periodLength={periodLength}
      />
      <div className="flex flex-row items-center gap-10">
        <MyImage
          src={`${IMAGE_URL}/${homeTeam.Image}`}
          alt={event.ScorerName}
        />
        <div>
          <div className="font-semibold">
            {event.ScorerName} #{event.ScorerJersey}
          </div>
          <div className="text-neutral-900">
            Syöttäjät:{" "}
            {event.FirstAssistJersey !== 0
              ? `${event.FirstAssistName} #${event.FirstAssistJersey}`
              : ""}
            {event.SecondAssistJersey !== 0
              ? `, ${event.SecondAssistName} #${event.SecondAssistJersey}`
              : ""}
          </div>
        </div>
      </div>
    </EventContainer>
  );

  return (
    <div className="flex flex-col justify-center">
      {header}
      {body}
    </div>
  );
};

export default EventsGoal;
