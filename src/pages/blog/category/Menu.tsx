"use client";
import { useAppSelector } from "@/hooks/redux";
import { getFilterPosts, getFormatTitle } from "@/lib/post";
import { IPosts } from "@/types/post";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "@/components/Pagination";
import { ROOTMENU_DESCRIPTION } from "@/constent";

const Menu = () => {
  const { posts } = useAppSelector((state) => state.postSlice);
  const category = useSearchParams().get("category")!;
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [filterPosts, setFilterPosts] = useState<IPosts>(
    getFilterPosts(category, posts),
  );
  const [description, setDescription] = useState<string>("");
  console.log(description);
  useEffect(() => {
    setFilterPosts(getFilterPosts(category, posts));
    setCurrentIndex(1);
    setDescription(
      ROOTMENU_DESCRIPTION[
        category.split(/\\|\//)[0] as keyof typeof ROOTMENU_DESCRIPTION
      ],
    );
  }, [category, posts]);
  return (
    <div className="w-[70rem] max-w-[calc(100vw-3rem)] py-12">
      <div className="absolute left-0 flex w-[100vw] flex-col items-center bg-slate-800 pl-0 text-blog-white transition-[padding] duration-300 xl:pl-[15rem]">
        <h1 className="p-6 text-[3rem] font-bold">
          {getFormatTitle(category)}
        </h1>
        <p className="m-6 mt-0 max-w-[75rem] rounded-lg bg-slate-600 p-12 text-[1.2rem]">
          {description}
        </p>
      </div>
      <div className="pt-[20rem]">
        {Object.keys(filterPosts).length !== 0 ? (
          <div className="flex w-full flex-col items-center gap-4">
            {Object.keys(filterPosts)
              .slice((currentIndex - 1) * 5, (currentIndex - 1) * 5 + 5)
              .map((post, i) => (
                <PostCard
                  key={i}
                  postCardData={filterPosts[post]}
                  fullPath={post}
                />
              ))}
            {Object.keys(filterPosts).length / 5 > 1 && (
              <Pagination
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                itemlength={Math.ceil(Object.keys(filterPosts).length / 5)}
                maxPaginationNum={10}
                style={{
                  paginationController: {
                    common:
                      "font-bold hover:cursor-pointer text-blog-white text-[1.5rem]",
                  },
                  paginationNumber: {
                    isActive: "text-slate-900 scale-[1.3] text-[1.5rem]",
                    noActive: "text-blog-white text-[1.5rem]",
                  },
                }}
              />
            )}
          </div>
        ) : (
          <div className="flex h-[300px] w-full items-center justify-center text-[2rem] font-bold text-gray-200">
            포스팅이 없습니다...
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
