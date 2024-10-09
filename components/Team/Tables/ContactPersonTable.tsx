"use client";

import { handleTempClick } from "@/utils/helpers";
import { TeamInfoContactPerson } from "@/utils/types";
import { useEffect, useState } from "react";
import Cell from "../../Table/Cell";
import TableHeader from "../../Table/TableHeader";
import TableHeaderRow from "../../Table/TableHeaderRow";
import TableRow from "../../Table/TableRow";
import TableTitleRow from "../../Table/TableTitleRow";

type ContactPersonProps = {
  data: TeamInfoContactPerson[];
};

const ContactPersonTable = ({ data }: ContactPersonProps) => {
  const [contactPersons, setContactPersons] = useState<TeamInfoContactPerson[]>(
    []
  );

  const contactPersonsItems = contactPersons.map((person) => (
    <TableRow key={`${person.FirstName}${person.LastName}${person.RoleName}`}>
      <Cell noTextCenter>
        {person.LastName} {person.FirstName}
      </Cell>
      <Cell>{person.RoleName}</Cell>
    </TableRow>
  ));

  useEffect(() => {
    if (data) {
      setContactPersons(data);
    }
  }, [data]);

  return (
    <div>
      <table>
        <thead>
          <TableHeaderRow
            onClick={() =>
              handleTempClick(data ?? [], contactPersons, setContactPersons)
            }
          >
            <TableHeader colSpan={2}>Henkilöstö</TableHeader>
          </TableHeaderRow>
          <TableTitleRow>
            <Cell className="text-center">Henkilö</Cell>
            <Cell>Rooli</Cell>
          </TableTitleRow>
        </thead>
        <tbody>{contactPersonsItems}</tbody>
      </table>
    </div>
  );
};

export default ContactPersonTable;
