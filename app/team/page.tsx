import TeamLayer from "@/components/Team/TeamLayer";
import { Suspense } from "react";

const TeamPage = () => {
  return (
    <Suspense>
      <TeamLayer />
    </Suspense>
  );
};

export default TeamPage;
