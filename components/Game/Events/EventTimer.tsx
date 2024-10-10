import { calculatePeriodMinutesAndSeconds } from "@/utils/helpers";

type EventTimerProps = {
  gameTime: number;
  periodLength: number;
  period: number;
  periodColor?: string;
};

const EventTimer = ({
  gameTime,
  periodLength,
  period,
  periodColor = "black",
}: EventTimerProps) => {
  const { minutes, seconds } = calculatePeriodMinutesAndSeconds(
    gameTime,
    periodLength,
    period
  );

  return (
    <div className="flex flex-col justify-center items-center font-semibold">
      <div className={`text-${periodColor}`}>{period}.</div>
      <div className="bg-neutral-300 border-[1.5px] p-1 rounded-xl">
        {minutes}:{seconds}
      </div>
    </div>
  );
};

export default EventTimer;
