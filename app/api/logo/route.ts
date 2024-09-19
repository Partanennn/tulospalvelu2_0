import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const url =
    "https://tulospalvelu.leijonat.fi/images/associations/weblogos/200x200/";

  const reqBody = await req.json();
  const res = await fetch(`${url}/${reqBody.url}`);

  const bufferImage = await res.arrayBuffer();

  return new NextResponse(Buffer.from(bufferImage), {
    headers: {
      "Content-type": "image/png",
    },
  });
};
