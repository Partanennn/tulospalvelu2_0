"use client";

import useFetch from "@/hooks/useFetch";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { Standing, useStandingStore } from "@/stores/standing-store";
import { imageUrl } from "@/utils/types";
import Image from "next/image";
import { useEffect } from "react";

const LogoSlider = () => {
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

  const logos = standing?.Teams.map((team) => {
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
    <div className="flex flex-row grow w-full justify-evenly my-3">{logos}</div>
  );
};

export default LogoSlider;
