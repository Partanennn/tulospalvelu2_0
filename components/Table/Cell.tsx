import { ReactNode } from "react";

type CellProps = {
  children: ReactNode;
  className?: string;
  colSpan?: number;
  onClick?: () => void;
};

const Cell = ({
  children,
  className = "",
  colSpan = 1,
  onClick = () => null,
}: CellProps) => {
  return (
    <td
      colSpan={colSpan}
      className={`px-2 sm:px-2 md:px-5 py-1.5 ${className}`}
    >
      {children}
    </td>
  );
};

export default Cell;
