import getLogo from "@/utils/getLogo";
import Image from "next/image";

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
      width={50}
      height={50}
    />
  ));

  return (
    <div className="flex flex-row grow w-full justify-evenly my-3">{logos}</div>
  );
};

export default LogoSlider;
