import { ReactNode } from "react";
import Cell from "./Cell";

type Props = {
  children: ReactNode;
  className?: string;
};

const HiddableCell = ({ children, className }: Props) => {
  return (
    <Cell className={`hidden sm:table-cell ${className}`}>{children}</Cell>
  );
};

export default HiddableCell;
