import Image from "next/image";
import getLogo from "@/utils/getLogo";

const templateTeams = [
  "HC Nokia/Hokkarit Oranssit",
  "HPK Oranssi",
  "Ilves Keltainen",
  "Ilves Musta",
  "Ilves Vihreä",
  "KOOVEE Black",
  "LeKi",
  "Pelicans Turkoosi",
  "Pelicans Turkoosi 2",
  "Tappara Musta",
  "Tappara Sininen",
];

const LogoSlider = () => {
  const logos = templateTeams.map((teamName) => (
    <Image
      key={teamName}
      src={getLogo(teamName)}
      alt={teamName}
      width={30}
      height={30}
    />
  ));

  return (
    <div className="flex flex-row grow w-full justify-evenly my-3">{logos}</div>
  );
};

export default LogoSlider;
