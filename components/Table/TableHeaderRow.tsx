import { ReactNode } from "react";

type TableHeaderRowProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

const TableHeaderRow = ({
  className = "",
  onClick = () => null,
  children,
}: TableHeaderRowProps) => {
  return (
    <tr
      onClick={onClick}
      className={`hover:cursor-pointer text-heading6 bg-primary-600 text-white ${className}`}
    >
      {children}
    </tr>
  );
};

export default TableHeaderRow;
