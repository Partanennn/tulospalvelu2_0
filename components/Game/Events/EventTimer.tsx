type EventTimerProps = {
  gameTime: number;
  periodLength: number;
  period: number;
};

const EventTimer = ({ gameTime, periodLength, period }: EventTimerProps) => {
  const minutes = String(
    Math.floor((gameTime % (periodLength * 60)) / 60)
  ).padStart(2, "0");

  const seconds = String((gameTime % (periodLength * 60)) % 60).padStart(
    2,
    "0"
  );
  return (
    <div className="flex flex-col justify-center items-center font-semibold">
      <div>{period}.</div>
      <div className="bg-neutral-300 border-[1.5px] p-1 rounded-xl">
        {minutes}:{seconds}
      </div>
    </div>
  );
};

export default EventTimer;
