import Rules from "@/components/Rules";
import SerieInfo from "@/components/SerieInfo";

const Saannot = () => {
  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row justify-evenly pt-7">
      <SerieInfo />
      <Rules />
    </div>
  );
};

export default Saannot;
