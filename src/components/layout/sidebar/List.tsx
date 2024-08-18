"use client";
import React, { useState } from "react";
import Title from "./Title";
import { getFormatText } from "@/lib/post";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
interface ListProps {
  category: string;
  postPaths: string[];
}
const List: React.FC<ListProps> = ({ category, postPaths }) => {
  const { menu } = useAppSelector((state) => state.postSlice);
  const route = useRouter();
  const query = useSearchParams().get("category");
  const params = usePathname();
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [currentFolder, _] = useState<string[]>(menu[category] as string[]);
  console.log("menu[category]@@@@@@@@@@", menu[category] as string[]);
  const handleOnClickTitle = () => {
    setIsToggle(!isToggle);
  };
  const handleOnClickItem = (category: string, item: string) => {
    const curUrl = `${params}?category=${query}`;
    const url = `/blog/category?category=${category}\\${item}`;
    if (curUrl !== url) {
      route.push(url);
    }
  };
  return (
    <li className="w-[calc(100%-0.5rem)] cursor-pointer">
      <div onClick={handleOnClickTitle}>
        {isToggle ? (
          <Title title={getFormatText(category)} />
        ) : (
          <h3 className="h-[2.5rem] p-2 text-[1rem] font-[600] text-blog-white">
            {getFormatText(category)}
          </h3>
        )}
      </div>
      <ul
        className="overflow-hidden bg-blog-white transition-[height]"
        style={{
          height: isToggle
            ? `${2 * (Object.keys(currentFolder).length - 1)}rem`
            : "0",
        }}
      >
        {currentFolder.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-1 p-1"
            onClick={() => handleOnClickItem(category, item)}
          >
            <h4>{getFormatText(item)}</h4>
            <p className="text-[0.8rem] opacity-80">
              {`(${
                postPaths.filter((postPath) => {
                  return postPath.includes(`${category}\\${item}`);
                }).length
              })`}
            </p>
          </div>
        ))}
      </ul>
    </li>
  );
};

export default List;
