import { ReactNode } from "react";

type EventContainerProps = {
  children: ReactNode;
  className?: string;
  gap?: string;
  onClick?: () => void;
};

const EventContainer = ({
  children,
  className = "",
  gap = "gap-10",
  onClick = () => null,
}: EventContainerProps) => {
  return (
    <div
      className={`flex flex-row items-center p-2 py-4 ${gap} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default EventContainer;
