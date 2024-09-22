"use client";

import { IMAGE_URL } from "@/app/api/_lib/urls";
import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { Standing, useStandingStore } from "@/stores/standing-store";
import Image from "next/image";
import { useEffect, useState } from "react";

import arrowIcon from "@/assets/Logos/arrow.png";
import { useLevelStore } from "@/stores/level-store";

const LogoSlider = () => {
  const [iconsStart, setIconsStart] = useState(0);
  const [iconsEnd, setIconsEnd] = useState(10);

  const { standing, updateStanding } = useStandingStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();
  const { selectedLevel } = useLevelStore();

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
        src={`${IMAGE_URL}/${team.TeamImg}`}
        alt={team.TeamAbbrv}
        width={50}
        height={50}
      />
    );
  });

  useEffect(() => {
    setIconsStart(0);
    setIconsEnd(10);
  }, [selectedGroup, selectedSeason, selectedLevel]);

  return (
    <div className="flex flex-row grow w-full justify-evenly items-center my-3">
      {iconsStart !== 0 ? (
        <Image
          src={arrowIcon}
          alt="left arrow icon"
          className="rotate-90 hover:cursor-pointer"
          height={30}
          width={30}
          onClick={() => {
            if (iconsStart > 0) {
              setIconsStart((oldValue) => oldValue - 1);
              setIconsEnd((oldValue) => oldValue - 1);
            }
          }}
        />
      ) : null}
      {logos}
      {standing?.Teams && iconsEnd < standing?.Teams?.length ? (
        <Image
          src={arrowIcon}
          alt="right arrow icon"
          className="-rotate-90 hover:cursor-pointer"
          height={30}
          width={30}
          onClick={() => {
            if (standing?.Teams && iconsEnd < standing?.Teams?.length) {
              setIconsEnd((oldValue) => oldValue + 1);
              setIconsStart((oldValue) => oldValue + 1);
            }
          }}
        />
      ) : null}
    </div>
  );
};

export default LogoSlider;
