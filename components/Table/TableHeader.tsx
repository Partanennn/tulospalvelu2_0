import { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  colSpan?: number;
  className?: string;
};

const TableHeader = ({
  children,
  colSpan = 4,
  className = "",
}: TableHeaderProps) => {
  return (
    <th
      colSpan={colSpan}
      className={`text-center text-xl bg-primary-600 text-white py-2 ${className}`}
    >
      {children}
    </th>
  );
};

export default TableHeader;
