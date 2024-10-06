type GameDetailsProps = {
  gameId: string;
};

const GameDetails = ({ gameId }: GameDetailsProps) => {
  return <div>{gameId}</div>;
};

export default GameDetails;
