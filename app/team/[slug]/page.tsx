import TeamLayer from "@/components/Team/TeamLayer";
import { Suspense } from "react";

type TeamSlugPageProps = {
  params: {
    slug: string;
  };
};

const TeamSlugPage = ({ params: { slug } }: TeamSlugPageProps) => {
  return (
    <Suspense>
      <TeamLayer teamId={slug} />
    </Suspense>
  );
};

export default TeamSlugPage;
