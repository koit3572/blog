'use client'
import PostContainerStyle1 from '@/components/post/PostContainerStyle1';
import { useAppSelector } from '@/hooks/redux';
import { PostData } from '@/store/post/postSlice';
import React from 'react'

const RecommendedPostList = () => {
  const { posts } = useAppSelector(state => state.postSlice.postData);
  const postsFilter = Object.keys(posts).filter(post => (
    posts[post].isFavorite
  ))
  const postList = postsFilter.reduce((acc, post) => {
    return (acc = {
      ...acc,
      [post]: posts[post]
    });
  }, {})

  return (
    <>
      <PostContainerStyle1
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
}

export default RecommendedPostList