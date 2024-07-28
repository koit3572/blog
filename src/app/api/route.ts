import { getAllPostPaths, getPostData, getPostFolderStructure } from "@/lib/post";
import { PostData } from "@/store/post/postSlice";
import { NextResponse } from "next/server"

export interface IMainSideBarData {
  [dirName: string]: string[] ;
}
export const GET = () => {
  const postFolderStructure = getPostFolderStructure();
  const postPaths = getAllPostPaths()!;
  const posts = postPaths.reduce((acc, postPath) => {
    const formatPath = postPath.join('/')
    const postData = getPostData(formatPath)
    return (acc = {
      ...acc,
      [formatPath]: {
        title: postData.data.title,
        writer: "koit",
        createdAt: postData.data.createdAt,
        updatedAt: postData.data.updatedAt,
        discription: postData.data.discription,
        tags: postData.data.tags,
        isFavorite: postData.data.isFavorite,
      } as PostData,
    });
  }, {})
  const postData = {
    postFolderStructure: postFolderStructure,
    posts:posts
  };
  return NextResponse.json(postData);
}