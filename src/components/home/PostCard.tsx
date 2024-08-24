"use client";
import { getFormatDiscription } from "@/lib/post";
import { useRouter } from "next/navigation";
import React from "react";

interface IPostCardProps {
  title: string;
  category: string[];
  discription: string;
  createdAt: string;
  writer: string;
  fullPath: string;
}
const PostCard: React.FC<IPostCardProps> = ({
  title,
  category,
  discription,
  createdAt,
  writer,
  fullPath,
}) => {
  const router = useRouter();
  const handlerOnClickCard = () => {
    router.push(
      `/blog/post?path=${decodeURI(fullPath.replaceAll("&", "%26"))}`,
    );
  };
  return (
    <div
      onClick={handlerOnClickCard}
      className="flex h-[8rem] w-full gap-3 border-b-[0.15rem] border-gray-400 p-4 px-0 hover:cursor-pointer xl:h-[12rem]"
    >
      <div className="h-[6rem] w-[6rem] bg-gray-400 xl:h-[10rem] xl:w-[10rem]"></div>
      <div className="w-[calc(100%-10rem)]">
        <div className="flex flex-col justify-start xl:flex-row xl:justify-between">
          <h3 className="overflow-hidden text-ellipsis whitespace-nowrap pb-2 font-bold">
            {title}
          </h3>
          <p className="flex w-[10rem] text-[0.8rem]">
            <span>{writer} </span>
            <span>{createdAt}</span>
          </p>
        </div>
        <div className="flex w-full whitespace-nowrap">
          {category.slice(0, -1).map((text, i) => (
            <p className="text-[0.8rem] opacity-75" key={i}>
              {text}
              {category.slice(0, -1).length - 1 !== i ? ">" : ""}
            </p>
          ))}
        </div>
        <p className="hidden text-[1rem] xl:block">{discription}</p>
      </div>
    </div>
  );
};

export default PostCard;
