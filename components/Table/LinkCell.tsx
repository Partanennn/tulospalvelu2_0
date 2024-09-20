import { ReactNode } from "react";
import Cell from "./Cell";

type LinkCell = {
  children: ReactNode;
  className?: string;
  url?: string;
};

const LinkCell = ({ children, className = "", url = "" }: LinkCell) => {
  return (
    <Cell className={`text-accent-500 ${className}`}>
      <a href={url}>{children}</a>
    </Cell>
  );
};

export default LinkCell;
