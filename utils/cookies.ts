import { useCookiesStore } from "@/stores/cookies-store";
import Cookies from "js-cookie";

export const getCookie = <T>(name: string): T | null => {
  const cookie = Cookies.get(name);

  if (!cookie) {
    return null;
  }

  const cookieObject: T = JSON.parse(cookie);

  return cookieObject;
};

export const setCookie = <T>(name: string, value: T) => {
  Cookies.set(name, JSON.stringify(value));
};
