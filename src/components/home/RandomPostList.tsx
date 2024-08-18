"use client";
import { useAppSelector } from "@/hooks/redux";
import getRandom from "@/utils/getRandom";
import React from "react";
import PostListContainer from "./PostListContainer";

const RandomPostList = () => {
  const arr = new Array(3);
  const { posts } = useAppSelector((state) => state.postSlice);
  console.log("posts", posts);
  const postList = [...arr].reduce((acc, _) => {
    const postKey =
      Object.keys(posts)[getRandom(0, Object.keys(posts).length - 1)];
    console.log("#@!#!@#!@#@!#!@#@!#!@#", postKey);
    return (acc = {
      ...acc,
      [postKey]: posts[postKey],
    });
  }, {});
  return (
    <>
      <PostListContainer
        postList={postList}
        mainTitle={"랜덤 포스팅"}
        subTitle={"랜덤으로 선택된 3개의 포스팅"}
      />
    </>
  );
};

export default RandomPostList;
