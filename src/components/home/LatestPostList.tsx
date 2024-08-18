"use client";
import { useAppSelector } from "@/hooks/redux";
import React from "react";
import PostListContainer from "./PostListContainer";

const LatestPostList = () => {
  const { posts } = useAppSelector((state) => state.postSlice);
  const postsCreatedAts = Object.keys(posts).map((post) =>
    new Date(posts[post].createdAt).getTime(),
  );
  const createdAtSort = postsCreatedAts.sort((date2, date1) => date1 - date2);
  const postList = createdAtSort.reduce((acc, date, i) => {
    const post = Object.keys(posts).find((data) => {
      const dateFormat = new Date(posts[data].createdAt).getTime();
      return dateFormat === date;
    })!;
    if (post && i < 10) {
      return (acc = { ...acc, [post]: posts[post] });
    } else {
      return (acc = acc);
    }
  }, {});
  return (
    <>
      <PostListContainer
        postList={Object.keys(postList).length !== 0 ? postList : null}
        mainTitle={"최신 포스팅"}
        subTitle={"작성일 기준으로 내림차순한 10개의 포스팅"}
      />
    </>
  );
};

export default LatestPostList;
