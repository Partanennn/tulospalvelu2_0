import PlayerInfo from "@/components/Player/PlayerInfo";
import { Suspense } from "react";

type PlayerSlugPageProps = {
  params: {
    slug: string;
  };
};

const PlayerSlugPage = ({ params: { slug } }: PlayerSlugPageProps) => {
  return (
    <div className="flex justify-center">
      <Suspense>
        <PlayerInfo playerId={slug ?? ""} />
      </Suspense>
    </div>
  );
};

export default PlayerSlugPage;
