import { ReactNode } from "react";

type CellProps = {
  children: ReactNode;
  className?: string;
};

const Cell = ({ children, className = "" }: CellProps) => {
  return (
    <td className={`text-sm px-5 py-1.5 text-center ${className}`}>
      {children}
    </td>
  );
};

export default Cell;
