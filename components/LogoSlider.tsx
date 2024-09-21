"use client";

import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { Standing, useStandingStore } from "@/stores/standing-store";
import { imageUrl } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";

import arrowIcon from "@/assets/Logos/arrow.png";

const LogoSlider = () => {
  const [iconsStart, setIconsStart] = useState(0);
  const [iconsEnd, setIconsEnd] = useState(10);

  const { standing, updateStanding } = useStandingStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  const { data: standingsData } = useFetch<Standing>("/api/standings", {
    method: "POST",
    body: JSON.stringify({
      season: selectedSeason?.SeasonNumber,
      stgid: selectedGroup?.StatGroupID,
    }),
  });

  useEffect(() => {
    if (standingsData) {
      updateStanding(standingsData);
    }
  }, [standingsData, updateStanding]);

  const logos = standing?.Teams.slice(iconsStart, iconsEnd).map((team) => {
    return (
      <Image
        key={team.UniqueID}
        src={`${imageUrl}/${team.TeamImg}`}
        alt={team.TeamAbbrv}
        width={50}
        height={50}
      />
    );
  });

  return (
    <div className="flex flex-row grow w-full justify-evenly items-center my-3">
      <Image
        src={arrowIcon}
        alt="left arrow icon"
        className="rotate-90"
        onClick={() => {
          if (iconsStart > 0) {
            setIconsStart((oldValue) => oldValue - 1);
            setIconsEnd((oldValue) => oldValue - 1);
          }
        }}
      />
      {logos}
      <Image
        src={arrowIcon}
        alt="right arrow icon"
        className="-rotate-90"
        onClick={() => {
          if (standing?.Teams && iconsEnd < standing?.Teams?.length) {
            setIconsEnd((oldValue) => oldValue + 1);
            setIconsStart((oldValue) => oldValue + 1);
          }
        }}
      />
    </div>
  );
};

export default LogoSlider;
