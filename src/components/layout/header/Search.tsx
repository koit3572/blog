"use client";
import { useAppSelector } from "@/hooks/redux";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import { getFormatTitle } from "@/lib/post";
import { getSearchRanking } from "@/lib/search";
import {
  addRecentSearchHistory,
  removeRecentSearchHistory,
} from "@/store/search/searchSlice";
import _ from "lodash";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface IFormValues {
  search: string;
}

interface IFormValues {
  search: string;
}
const Search = () => {
  const route = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isFocuse, setIsFocuse] = useState<boolean>(false);
  const [autoSearchComplete, setAutoSearchComplete] = useState<{
    [key: string]: string[];
  }>({});
  const [currentSearch, setCurrentSearch] = useState<string>("");

  const { register } = useForm<IFormValues>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const { recentSearchHistory } = useAppSelector((state) => state.searchSlice);
  const { posts } = useAppSelector((state) => state.postSlice);
  const dispatch = useDispatch();

  const getSearchResult = async (search: string) => {
    const searchRanking = await getSearchRanking({
      posts: posts,
      search: search,
    });

    const object = Object.fromEntries(
      Object.values(
        Object.entries(searchRanking).sort((a, b) => {
          return b[1].length - a[1].length;
        }),
      ),
    );
    setAutoSearchComplete(object);
  };

  const onClickRecentSearchHistory = (search: string) => {
    (document.getElementById("search-input") as HTMLInputElement).value =
      search;
    getSearchResult(search);
    setCurrentSearch(search);
  };
  const onClickDirectRoute = (path: string) => {
    (document.getElementById("search-input") as HTMLInputElement).value = "";
    setIsFocuse(false);
    getSearchResult("");
    setCurrentSearch("");
    dispatch(addRecentSearchHistory(getFormatTitle(path)));
    route.push(`/blog/post/?path=${decodeURI(path.replaceAll("&", "%26"))}`);
  };
  // const onSubmit = async (data: IFormValues) => {
  //   console.log(data,currentSearch)
  //   dispatch(addRecentSearchHistory(data.search))
  //   setCurrentSearch("")
  //   setIsFocuse(false)
  //   reset();
  // }
  const onChangeInput = _.debounce(
    (inputOnChange: React.ChangeEvent<HTMLInputElement>) => {
      register("search").onChange(inputOnChange);
      setCurrentSearch(inputOnChange.target.value);
      getSearchResult(inputOnChange.target.value);
    },
    300,
  );
  useOnclickOutside([formRef], () => {
    if (isFocuse) {
      setIsFocuse(false);
    }
  });

  return (
    <form
      ref={formRef}
      className="relative flex flex-col items-center text-blog-black"
      // onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="search-input"
        className="w-[250px] rounded-xl p-1 pl-2 pr-8 shadow-md outline-none focus:border"
        placeholder="통합 검색"
        autoComplete="off"
        {...register("search")}
        ref={(inputRef) => {
          register("search").ref(inputRef);
          if (inputRef) {
            const focusListener = () => {
              setIsFocuse(true);
              inputRef.removeEventListener("focus", focusListener);
            };
            inputRef.addEventListener("focus", focusListener);
          }
        }}
        onChange={(inputOnChange) => onChangeInput(inputOnChange)}
      />
      {isFocuse && (
        <div className="absolute m-12 max-h-[60vh] w-[450px] max-w-[calc(100vw-3rem)] overflow-y-auto rounded-lg bg-gray-100 p-3">
          {currentSearch.length === 0 ? (
            recentSearchHistory.length !== 0 ? (
              <div className="flex w-full flex-col items-center justify-center">
                <h3>최근 검색 기록</h3>
                {recentSearchHistory.map((search: string, i: number) => (
                  <div
                    key={i}
                    className="flex w-full cursor-pointer justify-between gap-6"
                  >
                    <p
                      className="block w-full"
                      onClick={() => onClickRecentSearchHistory(search)}
                    >
                      {search}
                    </p>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        dispatch(removeRecentSearchHistory(search))
                      }
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>최근 검색 기록이 없습니다.</div>
            )
          ) : (
            <>
              {Object.keys(autoSearchComplete).length === 0 ? (
                <div className="p-3 text-center">
                  <p>
                    {`"${currentSearch}"`}에 연관된 포스터를 찾지 못했습니다.
                  </p>
                  <p>
                    더 자세한 검색을 원한다면 검색어를 제출해주시기 바랍니다.
                  </p>
                </div>
              ) : (
                <div>
                  {Object.keys(autoSearchComplete).map((search, i) => {
                    return (
                      <div
                        key={i}
                        className="border-b-2 py-2 hover:cursor-pointer hover:bg-gray-300"
                        onClick={() => {
                          onClickDirectRoute(search);
                        }}
                      >
                        <p>{getFormatTitle(search)}</p>
                        <div className="flex gap-1">
                          {autoSearchComplete[search].map(
                            (data: string, i: number) => (
                              <p
                                key={i}
                                className="rounded-lg bg-gray-700 p-1 px-2 text-[0.7rem] text-gray-200"
                              >
                                {data}
                              </p>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      )}
      {/* <button
        type="submit"
        className="close absolute top-[0.45rem] right-[0.55rem] opacity-35"
      >
        <FaSearch size={18} className="pointer-events-none" />
      </button> */}
      <div className="close absolute right-[0.45rem] top-[0.50rem] h-[1.2rem] w-[1.2rem] opacity-35">
        <FaSearch className="pointer-events-none" />
      </div>
    </form>
  );
};

export default Search;
