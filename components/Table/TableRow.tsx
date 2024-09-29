import { ReactNode } from "react";

type TableRowProps = {
  children: ReactNode;
  className?: string;
  keyValue?: string;
};

const TableRow = ({ children, className = "" }: TableRowProps) => {
  return (
    <tr className={`odd:bg-neutral-500 even: bg-neutral-300 ${className}`}>
      {children}
    </tr>
  );
};

export default TableRow;
