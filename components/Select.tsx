"use client";

import { Series } from "@/utils/mockData";
import { Dispatch, SetStateAction, useState } from "react";

interface SelectProps {
  values: string[] | Series[];
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

const Select = ({ values, setSelectedValue }: SelectProps) => {
  const [selected, setSelected] = useState("");

  const options = values.map((option) => (
    <option key={option}>{option}</option>
  ));

  return (
    <select
      value={selected}
      onChange={(value) => {
        setSelected(value.currentTarget.value);
        setSelectedValue(value.currentTarget.value);
      }}
      className="bg-primary-600 rounded-full px-3 py-3 hover:bg-primary-500 hover:cursor-pointer"
    >
      {options}
    </select>
  );
};

export default Select;
