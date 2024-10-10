import { ReactNode } from "react";

type EventContainerProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const EventContainer = ({
  children,
  className = "",
  onClick = () => null,
}: EventContainerProps) => {
  return (
    <div
      className={`flex flex-row gap-10 items-center p-2 py-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default EventContainer;
