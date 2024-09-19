"use client";

import { Dispatch, SetStateAction, useState } from "react";

type ValuesWithId = {
  id: string;
  text: string;
};
interface SelectProps<T> {
  values: (T & ValuesWithId)[];
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

const Select = <T,>({ values, setSelectedValue }: SelectProps<T>) => {
  const [selected, setSelected] = useState("");

  const options = values.map((option) => (
    <option key={option.id}>{option.text}</option>
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
