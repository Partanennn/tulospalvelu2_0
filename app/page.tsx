import Scoreboard from "@/components/Standings";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-col justify-evenly pt-7 2xl:flex-row">
      <Scoreboard />
      <p>Ottelut tänään</p>
      <p>Pistepörssi</p>
    </div>
  );
};

export default Tulospalvelu;
