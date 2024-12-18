import { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  className?: string;
  keyValue?: string;
  onClick?: () => void;
};

const TableRow = ({
  children,
  className = "",
  onClick = () => null,
}: TableRowProps) => {
  return (
    <tr
      className={`odd:bg-neutral-500 even: bg-neutral-300 ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default TableRow;
