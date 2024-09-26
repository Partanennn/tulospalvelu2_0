import { ReactNode } from "react";

type TableTitleRowProps = {
  children: ReactNode;
};

const TableTitleRow = ({ children }: TableTitleRowProps) => {
  return <tr className="font-bold">{children}</tr>;
};

export default TableTitleRow;
