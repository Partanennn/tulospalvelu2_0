"use client";

import { Dispatch, SetStateAction } from "react";

type ValuesWithId = {
  id: string;
  text: string;
};
interface SelectProps<T> {
  values: (T & ValuesWithId)[];
  value: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
}

const Select = <T,>({ values, setSelectedValue, value }: SelectProps<T>) => {
  const options = values.map((option) => (
    <option key={option.id}>{option.text}</option>
  ));

  return (
    <select
      value={value}
      onChange={(value) => {
        setSelectedValue(value.currentTarget.value);
      }}
      className="bg-primary-600 border-none rounded-full px-3 py-3 hover:bg-primary-500 hover:cursor-pointer text-center"
    >
      {options}
    </select>
  );
};

export default Select;
