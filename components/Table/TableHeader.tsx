import { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  colSpan?: number;
  className?: string;
  onClick?: () => void;
};

const TableHeader = ({
  children,
  className = "",
  colSpan = 4,
  onClick = () => null,
}: TableHeaderProps) => {
  return (
    <th
      colSpan={colSpan}
      className={`text-center py-2 px-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </th>
  );
};

export default TableHeader;
