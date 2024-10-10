"use server";

import { Season } from "@/stores/season-store";
import { GET_SEASONS_URL } from "../_lib/urls";

export const getSeasonsAction = async (): Promise<Season[] | null> => {
  const url = GET_SEASONS_URL;

  const results = await fetch(url, {
    method: "POST",
  });
  const data: Season[] | null = await results.json();

  return data;
};
