import Standings from "@/components/Standing";

const Tulospalvelu = async () => {
  return (
    <div className="flex flex-row gap-4 w-full justify-around">
      <Standings />
      <p>Home</p>
    </div>
  );
};

export default Tulospalvelu;
