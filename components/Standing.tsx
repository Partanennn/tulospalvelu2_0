import { Standings } from "@/app/api/standings/route";
import { useEffect, useState } from "react";

const StandingsPage = () => {
  const [standingsData, setStandingsData] = useState<Standings | null>(null);

  useEffect(() => {}, []);
  return <p>Standing</p>;
};

export default StandingsPage;
