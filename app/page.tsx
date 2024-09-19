import Scoreboard from "@/components/Scoreboard";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-row justify-around">
      <Scoreboard />
      <p>Tulevat Ottelut</p>
      <p>Pistepörssi</p>
    </div>
  );
};

export default Tulospalvelu;
