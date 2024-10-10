import TeamLayer from "@/components/Team/TeamLayer";

type TeamSlugPageProps = {
  params: {
    slug: string;
  };
};

const TeamSlugPage = ({ params: { slug } }: TeamSlugPageProps) => {
  return <TeamLayer teamId={slug} />;
};

export default TeamSlugPage;
