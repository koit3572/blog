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
  const [currentIndexs, setCurrentIndexs] = useState<{ [key: number]: number }>(
    {},
  );
  const [filterPosts, setFilterPosts] = useState<{ [key: string]: IPosts }>({});
  const [description, setDescription] = useState<string>("");
  const setPaginationUpdate = (index: number) => {
    return (
      num: number,
      state = currentIndexs,
      fun = setCurrentIndexs,
      i = index,
    ) => {
      const result = {
        ...state,
        [i]: num,
      };
      fun(result);
    };
  };
  useEffect(() => {
    const filterPosts = getFilterPosts(category, posts);
    const result = Object.keys(filterPosts).reduce(
      (filterPostsAcc, postKey) => {
        let title = posts[postKey].title.slice(
          0,
          posts[postKey].title.indexOf("]")
            ? posts[postKey].title.indexOf("]") + 1
            : 0,
        );
        if (title.length === 0) {
          return (filterPostsAcc = {
            ...filterPostsAcc,
            ["Common"]: {
              ...(filterPostsAcc.Common as any),
              [postKey]: filterPosts[postKey],
            },
          });
        } else {
          return (filterPostsAcc = {
            ...filterPostsAcc,
            [title.slice(1, -1)]: {
              ...(filterPostsAcc[title.slice(1, -1) as string] as any),
              [postKey]: filterPosts[postKey],
            },
          });
        }
      },
      {} as { [key: string]: IPosts },
    );
    const currentIndexs = Object.keys(result).reduce(
      (currentIndexsAcc, _, i) => {
        return (currentIndexsAcc = {
          ...currentIndexsAcc,
          [i]: 1,
        });
      },
      {} as { [key: number]: number },
    );
    setFilterPosts(result);
    setCurrentIndexs(currentIndexs);
    setDescription(
      ROOTMENU_DESCRIPTION[
        category.split(/\\|\//)[0] as keyof typeof ROOTMENU_DESCRIPTION
      ],
    );
  }, [category, posts]);
  return (
    <div className="w-[70rem] max-w-[calc(100vw-3rem)]">
      <div className="absolute left-0 flex w-[100vw] flex-col items-center bg-slate-800 pl-0 text-blog-white transition-[padding] duration-300 xl:pl-[15rem]">
        <h1 className="p-6 text-[3rem] font-bold">
          {getFormatTitle(category)}
        </h1>
        <p className="m-6 mt-0 max-w-[75rem] rounded-lg bg-slate-600 p-12 text-[1.2rem]">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-12">
        {Object.keys(filterPosts).map((postKey, i) => (
          <div
            className={`${i === 0 ? "mt-[20rem]" : ""} flex w-full flex-col items-center bg-slate-600 p-6`}
            key={i}
          >
            <h1 className="p-12 text-[2.5rem] font-bold text-blog-white">
              {postKey}
            </h1>
            {Object.keys(filterPosts[postKey]).length !== 0 ? (
              <div className="flex w-full flex-col items-center gap-4">
                {Object.keys(filterPosts[postKey])
                  .slice(
                    (currentIndexs[i] - 1) * 5,
                    (currentIndexs[i] - 1) * 5 + 5,
                  )
                  .map((post, i) => (
                    <PostCard
                      key={i}
                      postCardData={filterPosts[postKey][post]}
                      fullPath={post}
                    />
                  ))}
                {Object.keys(filterPosts[postKey]).length / 5 > 1 && (
                  <Pagination
                    currentIndex={currentIndexs[i]}
                    setCurrentIndex={setPaginationUpdate(i)}
                    itemlength={Math.ceil(
                      Object.keys(filterPosts[postKey]).length / 5,
                    )}
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
        ))}
      </div>
    </div>
  );
};

export default Menu;
