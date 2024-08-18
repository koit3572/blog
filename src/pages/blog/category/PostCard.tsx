"use client";
import React from "react";
import { PostInfo } from "@/types/post";
import { useRouter } from "next/navigation";
export interface IPostCardProps {
  postCardData: PostInfo;
  fullPath: string;
}
const PostCard: React.FC<IPostCardProps> = ({ postCardData, fullPath }) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(
      `/blog/post?path=${encodeURI(fullPath).replaceAll("&", "%26")}`,
    );
  };
  return (
    <div className="relative h-[15rem] w-full rounded-lg bg-blog-white transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
      <div className="flex p-4" onClick={() => handlerOnClickCard()}>
        <div className="full h-[13rem] w-[13rem] bg-gray-300">
          {/* 추후 이미지 추가 */}
        </div>
        <div className="flex w-[calc(100%-12rem)] flex-col p-2">
          <h2 className="overflow-hidden overflow-ellipsis text-nowrap text-[1.8rem] font-[600]">
            {postCardData.title}
          </h2>
          <p>{postCardData.createdAt}</p>
          <p className="break-words text-[1.2rem]">
            {postCardData.discription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
