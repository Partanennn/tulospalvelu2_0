import { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  className?: string;
  key?: string;
};

const TableRow = ({ children, className = "", key = "" }: TableRowProps) => {
  return (
    <tr
      key={key}
      className={`odd:bg-neutral-500 even: bg-neutral-300 ${className}`}
    >
      {children}
    </tr>
  );
};

export default TableRow;
