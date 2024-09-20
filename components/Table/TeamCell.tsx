import { Cell } from "../Scoreboard";

const TeamCell = () => {
  return (
    <Cell className="flex justify-start">
      <div className="mx-2">
        <Image
          src={`${imageUrl}/${game.HomeImg}`}
          height={30}
          width={30}
          alt={game.HomeTeamAbbrv}
        />
      </div>
      <div className="flex flex-grow justify-center">{game.HomeTeamAbbrv}</div>
    </Cell>
  );
};
