"use client";
import React from "react";
import { PostInfo } from "@/types/post";
import { useRouter } from "next/navigation";
import { getFormatDiscription, getFormatTitle } from "@/lib/post";
export interface IPostCardProps {
  postCardData: PostInfo;
  fullPath: string;
}

const PostCard: React.FC<IPostCardProps> = ({ postCardData, fullPath }) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(
      `/blog/post?path=${decodeURI(fullPath.replaceAll("&", "%26"))}`,
    );
  };
  return (
    <div className="relative h-[12rem] w-full rounded-lg bg-blog-white transition-transform duration-300 hover:z-10 hover:scale-105 hover:cursor-pointer xl:h-[15rem]">
      <div className="flex p-4" onClick={() => handlerOnClickCard()}>
        <div className="full h-[10rem] w-[10rem] bg-slate-200 xl:h-[13rem] xl:w-[13rem]">
          {/* 추후 이미지 추가 */}
        </div>
        <div className="flex w-[calc(100%-12rem)] flex-col">
          <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[1.8rem] font-[600]">
            {postCardData.title.replace(/\[.+\]/, "")}
          </h2>
          <p>{postCardData.createdAt}</p>
          <p className="flex whitespace-nowrap">
            {postCardData.category.slice(0, -1).map((text, i) => (
              <span className="text-[0.8rem] opacity-75" key={i}>
                {text}
                {postCardData.category.slice(0, -1).length - 1 !== i ? ">" : ""}
              </span>
            ))}
          </p>
          <p className="block break-words text-[1.2rem] xl:hidden">
            {getFormatDiscription(postCardData.discription)}
          </p>
          <p className="hidden break-words text-[1.2rem] xl:block">
            {postCardData.discription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
