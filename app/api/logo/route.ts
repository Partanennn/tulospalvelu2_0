import { NextResponse } from "next/server";
import { IMAGE_URL } from "../_lib/urls";

export const POST = async (req: Request) => {
  const url = IMAGE_URL;

  const reqBody = await req.json();
  const res = await fetch(`${url}/${reqBody.url}`);

  const bufferImage = await res.arrayBuffer();

  return new NextResponse(Buffer.from(bufferImage), {
    headers: {
      "Content-type": "image/png",
    },
  });
};
