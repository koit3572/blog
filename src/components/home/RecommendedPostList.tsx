"use client";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import PostListContainer from "./PostListContainer";

const RecommendedPostList = () => {
  const { posts } = useAppSelector((state) => state.postSlice);
  console.log("posts222", posts);
  const postsFilter = Object.keys(posts).filter(
    (post) => posts[post].isFavorite,
  );
  const postList = postsFilter.reduce((acc, post) => {
    return (acc = {
      ...acc,
      [post]: posts[post],
    });
  }, {});

  console.log(posts);
  return (
    <>
      <PostListContainer
        postList={Object.keys(postList).length !== 0 ? postList : null}
        mainTitle={"추천 포스팅"}
        subTitle={`${
          Object.keys(postList).length !== 0
            ? `${Object.keys(postList).length}개`
            : ""
        }`}
      />
    </>
  );
};

export default RecommendedPostList;
