"use client";

import useFetch from "@/hooks/useFetch";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

const TeamIdPage = ({ params: { id } }: Props) => {
  const { data } = useFetch("/api/teaminfo", {
    method: "POST",
    body: JSON.stringify({
      teamid: id,
    }),
  });
  return <div>Team page::DDD {id}</div>;
};

export default TeamIdPage;
