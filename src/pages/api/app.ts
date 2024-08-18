import { getMenu, getPostPaths, getPosts } from "@/lib/post";
import { ApiResApp } from "@/types/post";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

const handler = (req: NextRequest, res: NextApiResponse<ApiResApp>) => {
  switch (req.method) {
    case "GET": {
      try {
        res.status(200).json({
          posts: getPosts(),
          menu: getMenu(),
          error: "",
        });
      } catch (error) {
        res.status(500).json({
          posts: {},
          menu: {},
          error: "failed to load AppData",
        });
      }
      break;
    }
  }
};
export default handler;
