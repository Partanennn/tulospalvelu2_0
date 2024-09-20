"use client";

import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useStandingStore } from "@/stores/standing-store";
import { imageUrl } from "@/utils/types";
import Image from "next/image";
import { useEffect } from "react";

const LogoSlider = () => {
  const { standing, updateStanding } = useStandingStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      const getStandings = async () => {
        const res = await fetch("/api/standings", {
          method: "POST",
          body: JSON.stringify({
            season: selectedSeason.SeasonNumber,
            stgid: selectedGroup.StatGroupID,
          }),
        });

        const data = await res.json();
        updateStanding(data);
      };

      getStandings();
    }
  }, [selectedSeason, selectedGroup]);

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
