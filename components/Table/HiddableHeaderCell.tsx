import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const HiddableHeaderCell = ({ children }: Props) => {
  return <th className="hidden sm:table-cell">{children}</th>;
};

export default HiddableHeaderCell;
