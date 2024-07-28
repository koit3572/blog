import { getPostData } from "@/lib/post";
import { NextRequest, NextResponse } from "next/server"

export const GET = (req: NextRequest) => {
  const reqURL = decodeURI(req.nextUrl.pathname);
  const post = getPostData(reqURL);
  return NextResponse.json(post);
}
