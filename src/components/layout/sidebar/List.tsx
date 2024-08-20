"use client";
import React, { useState } from "react";
import Title from "./Title";
import { getFormatText } from "@/lib/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import path from "path";
interface ListProps {
  category: string;
  currentFolder: string[];
  postPaths: string[];
}
const List: React.FC<ListProps> = ({ category, currentFolder, postPaths }) => {
  const route = useRouter();
  const query = useSearchParams().get("category");
  const params = usePathname();
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const handleOnClickTitle = () => {
    setIsToggle(!isToggle);
  };
  const handleOnClickItem = (category: string, item: string) => {
    const curUrl = `${params}?category=${query}`;
    const url = `/blog/category?category=${path.join(category, item)}`;
    if (curUrl !== url) {
      route.push(url);
    }
  };
  return (
    <li className="w-[calc(100%-0.5rem)] cursor-pointer">
      <div onClick={handleOnClickTitle} className="text-[1rem]">
        {isToggle ? (
          <Title title={getFormatText(category)} />
        ) : (
          <h3 className="h-[2.5rem] p-2 font-[600] text-blog-white">
            {getFormatText(category)}
          </h3>
        )}
      </div>
      <ul
        className="overflow-hidden bg-blog-white transition-[height]"
        style={{
          height: isToggle
            ? `${1.7 * Object.keys(currentFolder).length}rem`
            : "0",
        }}
      >
        {currentFolder.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-1 p-1 text-[0.8rem]"
            onClick={() => handleOnClickItem(category, item)}
          >
            <h4>{getFormatText(item)}</h4>
            <p className="opacity-80">
              {`(${
                postPaths.filter(
                  (postPath) =>
                    postPath.includes(category) && postPath.includes(item),
                ).length
              })`}
            </p>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default List;
