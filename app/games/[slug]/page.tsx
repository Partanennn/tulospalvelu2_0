import GameDetails from "@/components/Game/GameDetails";

type GamesSlugProps = {
  params: {
    slug: string;
  };
};

const GamesSlugPage = ({ params: { slug } }: GamesSlugProps) => {
  return <GameDetails gameId={slug} />;
};

export default GamesSlugPage;
