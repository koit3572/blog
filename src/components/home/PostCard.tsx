"use client";
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
      className="flex h-[12rem] w-full gap-3 border-b-[0.15rem] border-gray-400 p-4 px-2 hover:cursor-pointer"
    >
      <div className="h-[10rem] w-[10rem] bg-gray-400"></div>
      <div className="w-[calc(100%-11rem)] overflow-hidden">
        <div className="flex items-center justify-between">
          <h3 className="w-[calc(100%-10rem)] overflow-hidden text-ellipsis whitespace-nowrap pb-2 font-bold">
            {title}
          </h3>
          <p className="w-[10rem] text-[0.8rem]">
            <span>{writer} </span>
            <span>{createdAt}</span>
          </p>
        </div>
        <div className="flex whitespace-nowrap">
          {category.slice(0, -1).map((text, i) => (
            <p className="text-[0.8rem] opacity-75" key={i}>
              {text}
              {category.slice(0, -1).length - 1 !== i ? ">" : ""}
            </p>
          ))}
        </div>
        <p className="flex overflow-hidden text-ellipsis text-[1rem]">
          {discription}
        </p>
      </div>
    </div>
  );
};

export default PostCard;
