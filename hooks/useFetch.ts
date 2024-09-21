import { useEffect, useState } from "react";

type UseFetchType<T> = {
  data: T | null;
  isLoading: boolean;
};

const useFetch = <T>(
  url: string,
  options: RequestInit = {}
): UseFetchType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(url, options);
      const newData = (await res.json()) as T;
      setIsLoading(false);
      setData(newData);
    };
    fetchData();
  }, [url, options.body]);
  return { data, isLoading };
};

export default useFetch;
