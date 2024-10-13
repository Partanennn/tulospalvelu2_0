import EventContainer from "./EventContainer";

type EventsPeriodProps = {
  period: number;
};

const EventsPeriod = ({ period }: EventsPeriodProps) => {
  return (
    <EventContainer className="flex justify-center bg-neutral-300">
      <div className="font-semibold">{period}. Erä alkaa</div>
    </EventContainer>
  );
};

export default EventsPeriod;
