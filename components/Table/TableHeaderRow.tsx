import { ReactNode } from "react";

type TableHeaderProps = {
  children: ReactNode;
  colSpan?: number;
  className?: string;
  onClick?: () => void;
};

const TableHeaderRow = ({
  children,
  colSpan = 4,
  className = "",
  onClick = () => null,
}: TableHeaderProps) => {
  return (
    <tr onClick={onClick} className="hover:cursor-pointer">
      <th
        colSpan={colSpan}
        className={`text-center text-xl bg-primary-600 text-white py-2 px-5 ${className}`}
      >
        {children}
      </th>
    </tr>
  );
};

export default TableHeaderRow;
