"use client";

import { IMAGE_URL } from "@/app/_lib/urls";
import { useGroupStore } from "@/stores/group-store";
import { useSeasonStore } from "@/stores/season-store";
import { useTeamStatsStore } from "@/stores/team-stats-store";
import { useEffect, useState } from "react";

import { getTeamStats } from "@/app/_actions/teamStatsAction";
import arrowIcon from "@/assets/Logos/arrow.png";
import useWindowSize from "@/hooks/useWindowSize";
import { useLevelStore } from "@/stores/level-store";
import {
  EXTRA_SMALL_DESKTOP_SIZE,
  LARGE_DESKTOP_SIZE,
  MEDIUM_DESKTOP_SIZE,
  MOBILE_SIZE,
  SMALL_DESKTOP_SIZE,
  SMALL_MOBILE_SIZE,
  TABLET_SIZE,
} from "@/utils/windowSizes";
import { useRouter } from "next/navigation";
import MyImage from "./MyImage";

const ICONS_SHOWN_COUNT = 8;

const LogoSlider = () => {
  const router = useRouter();
  const [iconCount, setIconCount] = useState(ICONS_SHOWN_COUNT);
  const [iconsStart, setIconsStart] = useState(0);
  const [iconsEnd, setIconsEnd] = useState(ICONS_SHOWN_COUNT);
  const { height, width } = useWindowSize();

  const { teamStats, updateTeamStats } = useTeamStatsStore();
  const { selectedSeason } = useSeasonStore();
  const { selectedGroup } = useGroupStore();
  const { selectedLevel } = useLevelStore();

  useEffect(() => {
    if (selectedSeason && selectedGroup) {
      // TODO: Move to layout etc.
      const getStandings = async () => {
        const data = await getTeamStats({
          groupId: selectedGroup.StatGroupID,
          seasonId: selectedSeason.SeasonNumber,
        });

        if (data) {
          updateTeamStats(data);
        }
      };
      getStandings();
    }
  }, [selectedSeason, selectedGroup]);

  const logos = teamStats?.Teams.slice(iconsStart, iconsEnd).map((team) => {
    return (
      <MyImage
        key={team.TeamID}
        src={`${IMAGE_URL}/${team.TeamImg}`}
        alt={team.TeamAbbrv}
        width={50}
        height={50}
        className="hover:cursor-pointer"
        onClick={() => {
          router.push(`/team/${team.TeamID}`);
        }}
      />
    );
  });

  useEffect(() => {
    if (width) {
      if (width > LARGE_DESKTOP_SIZE) {
        setIconCount(14);
      } else if (width > MEDIUM_DESKTOP_SIZE) {
        setIconCount(12);
      } else if (width > SMALL_DESKTOP_SIZE) {
        setIconCount(9);
      } else if (width > EXTRA_SMALL_DESKTOP_SIZE) {
        setIconCount(7);
      } else if (width > TABLET_SIZE) {
        setIconCount(6);
      } else if (width > MOBILE_SIZE) {
        setIconCount(5);
      } else if (width > SMALL_MOBILE_SIZE) {
        setIconCount(4);
      } else {
        setIconCount(3);
      }
    }
  }, [height, width]);

  useEffect(() => {
    setIconsStart(0);
    setIconsEnd(iconCount);
  }, [selectedGroup, selectedSeason, selectedLevel, iconCount]);

  return (
    <div className="flex flex-row grow w-full justify-evenly items-center my-3">
      {iconsStart !== 0 ? (
        <MyImage
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
      {teamStats?.Teams && iconsEnd < teamStats?.Teams?.length ? (
        <MyImage
          src={arrowIcon}
          alt="right arrow icon"
          className="-rotate-90 hover:cursor-pointer"
          height={30}
          width={30}
          onClick={() => {
            if (teamStats?.Teams && iconsEnd < teamStats?.Teams?.length) {
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
