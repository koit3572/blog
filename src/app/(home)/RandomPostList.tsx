"use client";
import PostContainerStyle1 from "@/components/post/PostContainerStyle1";
import { useAppSelector } from "@/hooks/redux";
import getRandom from "@/utils/getRandom";
import React from "react";

const RandomPostList = () => {
  const arr = new Array(3);
  const { posts } = useAppSelector((state) => state.postSlice.postData);
  const postList = [...arr].reduce((acc, _) => {
    const postKey = Object.keys(posts)[getRandom(0, Object.keys(posts).length - 1)]
    return (acc = {
      ...acc,
      [postKey]: posts[postKey],
    });
  }, {});
  return (
    <>
      <PostContainerStyle1
        postList={Object.keys(postList).length !== 0 ? postList : null}
        mainTitle={"랜덤 포스팅"}
        subTitle={"랜덤으로 선택된 3개의 포스팅"}
      />
    </>
  );
};

export default RandomPostList;
