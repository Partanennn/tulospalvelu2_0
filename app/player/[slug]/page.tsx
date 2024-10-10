import PlayerInfo from "@/components/Player/PlayerInfo";

type PlayerSlugPageProps = {
  params: {
    slug: string;
  };
};

const PlayerSlugPage = ({ params: { slug } }: PlayerSlugPageProps) => {
  return (
    <div className="flex justify-center">
      <PlayerInfo playerId={slug ?? ""} />
    </div>
  );
};

export default PlayerSlugPage;
