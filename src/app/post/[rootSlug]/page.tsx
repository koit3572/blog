'use client'
import ErrorPage from '@/components/ErrorPage';
import Pagination from '@/components/Pagination';
import PostCard1 from '@/components/post/PostCard1';
import { useAppSelector } from '@/hooks/redux';
import { getPostTitleformat, removeNumbering } from '@/lib/post';
import { testPostData } from '@/store/post/postSlice';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const RootPostList = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const searchParams = useSearchParams();
  const choice = searchParams.get("choice");
  const posts = useAppSelector((state) => state.postSlice.postData.posts);
  const postPaths = Object.keys(posts);
  const filterPostPaths: string[] = postPaths.filter(postPath => postPath.split('/')[1] === choice)
  const filterPosts = filterPostPaths.reduce((acc, postPath) => {
    const isPost =
      Object.keys(posts[postPath]).sort().join("") ===
      Object.keys(testPostData).sort().filter(key=>key!='content').join("")
    if (isPost) return (acc = [...acc, posts[postPath]]);
    else return acc
  }, [] as any)

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0] as HTMLElement;
    window.scrollTo(0,header.offsetHeight);
  }, [choice]);

  if (choice) {
    return (
      <div className="flex justify-center w-full h-full">
        <div className="flex flex-col justify-center items-center w-[1100px]">
          <h1 className="text-[2rem] text-gray-200 font-bold">
            {removeNumbering(choice)}
          </h1>
          <div className=" flex flex-col gap-6 w-full py-12">
            {filterPosts.length ? (
              <>
                {filterPosts
                  .slice((currentIndex - 1) * 5, (currentIndex - 1) * 5 + 5)
                  .map((postCardData: any, i: number) => {
                    const postCardDataFormat = { ...postCardData, title: getPostTitleformat(filterPostPaths[i+((currentIndex-1)*5)]) }
                    return (
                      <PostCard1
                        key={i}
                        postCardData={postCardDataFormat}
                        fullPath={filterPostPaths[i+((currentIndex-1)*5)]}
                      />
                    );
                  })}
              </>
            ) : (
              <div className="flex justify-center items-center w-full h-[300px] text-[2rem] text-gray-200 font-bold">
                포스팅이 없습니다...
              </div>
            )}
          </div>
          {filterPosts.length !== 0 && (
            <Pagination
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              itemlength={Math.ceil(filterPosts.length / 5)}
              maxPaginationNum={10}
            />
          )}
          
        </div>
      </div>
    );
  } else {
    return <ErrorPage />;
  }
}

export default RootPostList;