'use client'

import { useAppSelector } from "@/hooks/redux";
import useOnclickOutside from "@/hooks/useOnclickOutside";
import { getPostTitleformat } from "@/lib/post";
import { getSearchRanking } from "@/lib/search";
import { addRecentSearchHistory, removeRecentSearchHistory } from "@/store/search/searchSlice";
import * as _ from "lodash";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from "react-redux";

interface IFormValues {
  search: string;
}
const Search = () => {
  const route = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isFocuse, setIsFocuse] = useState<boolean>(false)
  const [autoSearchComplete, setAutoSearchComplete] = useState<{ [key: string]: string[] }>({});
  const [currentSearch, setCurrentSearch] = useState<string>("")
  
  const { register, handleSubmit,reset } = useForm<IFormValues>({
    mode: "onSubmit",
    defaultValues: {
      search: "",
    },
  });

  const { recentSearchHistory } = useAppSelector(state => state.searchSlice)
  const { posts } = useAppSelector(state=>state.postSlice.postData)
  const dispatch = useDispatch();

  const getSearchResult = async (search: string) => {

    const searchRanking = await getSearchRanking({ posts: posts, search: search });

    const object = Object.fromEntries(
      Object.values(Object.entries(searchRanking).sort((a, b) => {
        return b[1].length - a[1].length
      }))
    );
    setAutoSearchComplete(object);
  };

  const onClickRecentSearchHistory = (search: string) => {
    (document.getElementById("search-input") as HTMLInputElement).value = search;
    getSearchResult(search);
    setCurrentSearch(search);
  };
  const onClickDirectRoute = (path: string) => {
    (document.getElementById("search-input") as HTMLInputElement).value = "";
    setIsFocuse(false)
    getSearchResult("");
    setCurrentSearch("");
    dispatch(addRecentSearchHistory(getPostTitleformat(path)))
    route.push(`/post/${path}`)
  }
  const onSubmit = async (data: IFormValues) => {
    console.log(data,currentSearch)
    dispatch(addRecentSearchHistory(data.search))
    setCurrentSearch("")
    setIsFocuse(false)
    reset();
  }
  const onChangeInput = _.debounce((inputOnChange: React.ChangeEvent<HTMLInputElement>) => {
    register("search").onChange(inputOnChange);
    setCurrentSearch(inputOnChange.target.value);
    getSearchResult(inputOnChange.target.value);
  },300);
  useOnclickOutside([formRef], () => {
    if (isFocuse) {
      setIsFocuse(false);
    }
  });

  return (
    <form
      ref={formRef}
      className="relative flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        id="search-input"
        className="w-[250px] outline-none p-1 pl-2 pr-8 rounded-xl focus:border shadow-md"
        placeholder="통합 검색"
        autoComplete="off"
        {...register("search")}
        ref={(inputRef) => {
          register("search").ref(inputRef);
          if (inputRef) {
            const focusListener = () => {
              setIsFocuse(true);
            };
            inputRef.addEventListener("focus", focusListener);
            return () => {
              inputRef.removeEventListener("focus", focusListener);
            };
          }
        }}
        onChange={(inputOnChange) => onChangeInput(inputOnChange)}
      />
      {isFocuse && (
        <div className="absolute w-[450px] max-h-[400px] m-12 p-3 bg-gray-100 rounded-lg overflow-y-auto">
          {currentSearch.length === 0 ? (
            recentSearchHistory.length !== 0 ? (
              <div className="flex flex-col justify-center items-center w-full">
                <h3>최근 검색 기록 {currentSearch}</h3>
                {recentSearchHistory.map((search: string, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between gap-6 w-full cursor-pointer"
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
                        className="py-2 hover:cursor-pointer hover:bg-gray-300 border-b-2"
                        onClick={() => {
                          onClickDirectRoute(search);
                        }}
                      >
                        <p>{getPostTitleformat(search)}</p>
                        <div className="flex gap-1">
                          {autoSearchComplete[search].map((data, i) => (
                            <p
                              key={i}
                              className="bg-gray-700 text-gray-200 p-1 px-2 rounded-lg text-[0.7rem]"
                            >
                              {data}
                            </p>
                          ))}
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
      <button
        type="submit"
        className="close absolute top-[0.45rem] right-[0.55rem] opacity-35"
      >
        <FaSearch size={18} className="pointer-events-none" />
      </button>
    </form>
  );
}

export default Search