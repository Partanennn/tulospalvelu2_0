import { useEffect, useState } from "react";

type UseFetchType<T> = {
  data: T | null;
  isLoading: boolean;
  statusCode: number;
  error: string | null;
};

const useFetch = <T>(
  url: string,
  options: RequestInit = {}
): UseFetchType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [statusCode, setStatusCode] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const newData = (await res.json()) as T;
        setIsLoading(false);
        setStatusCode(res.status);
        setData(newData);
      } catch (error) {
        setIsLoading(false);
        setStatusCode(500);
        setError(`Error on fetch: ${error}; Used url ${url}`);
      }
    };
    fetchData();
  }, [url, options.body]);
  return { data, isLoading, statusCode, error };
};

export default useFetch;
