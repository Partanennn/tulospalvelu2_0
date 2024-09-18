import getLogo from "@/utils/getLogo";
import { teams } from "@/utils/mockData";
import Image from "next/image";

const LogoSlider = () => {
  const logos = teams.map((teamName) => (
    <Image
      key={teamName}
      src={getLogo(teamName)}
      alt={teamName}
      width={50}
      height={50}
    />
  ));

  return (
    <div className="flex flex-row grow w-full justify-evenly my-3">{logos}</div>
  );
};

export default LogoSlider;
