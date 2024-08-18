"use client";
import { useAppSelector } from "@/hooks/redux";
import { getFilterPosts } from "@/lib/post";
import { IPosts } from "@/types/post";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Pagination from "@/components/Pagination";

const Menu = () => {
  const { posts } = useAppSelector((state) => state.postSlice);
  const category = useSearchParams().get("category")!;
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [filterPosts, setFilterPosts] = useState<IPosts>(
    getFilterPosts(category, posts),
  );
  useEffect(() => {
    setFilterPosts(getFilterPosts(category, posts));
    setCurrentIndex(1);
  }, [category, posts]);
  return (
    <div>
      {Object.keys(filterPosts).length !== 0 ? (
        <div className="flex w-[1100px] flex-col items-center gap-4">
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
                  common: "font-bold hover:cursor-pointer text-blog-white",
                },
                paginationNumber: {
                  isActive: "text-slate-900 scale-[1.3]",
                  noActive: "text-blog-white",
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
  );
};

export default Menu;
