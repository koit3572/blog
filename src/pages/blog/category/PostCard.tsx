"use client";
import React from "react";
import { PostInfo } from "@/types/post";
import { useRouter } from "next/navigation";
import { getFormatdescription, getFormatTitle } from "@/lib/post";
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
    <div className="relative h-[10rem] w-full rounded-lg bg-blog-white transition-transform duration-300 hover:z-10 hover:scale-105 hover:cursor-pointer xl:h-[15rem]">
      <div className="flex p-4" onClick={() => handlerOnClickCard()}>
        <div className="full h-[8rem] w-[8rem] bg-slate-200 xl:block xl:h-[13rem] xl:w-[13rem]">
          {/* 추후 이미지 추가 */}
        </div>
        <div className="flex h-[8rem] w-[calc(100%-10rem)] flex-col xl:h-[13rem] xl:w-[calc(100%-14rem)]">
          <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[1.25rem] font-[600] xl:text-[1.5rem]">
            {postCardData.title.slice(postCardData.title.indexOf("]") + 1)}
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
          <p className="line-clamp-2 text-ellipsis text-[1.2rem] xl:line-clamp-3">
            {postCardData.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
