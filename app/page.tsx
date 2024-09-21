import Scoreboard from "@/components/Standings";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-row justify-evenly pt-7">
      <Scoreboard />
      <p>Tulevat Ottelut</p>
      <p>Pistepörssi</p>
    </div>
  );
};

export default Tulospalvelu;
