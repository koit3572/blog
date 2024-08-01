'use client'
import React, { useEffect, useRef, useState } from 'react'
import MarkdownPreview from '@/components/post/MarkdownPreview';
import PostContainer from '@/components/post/PostContainer';
import { usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchPostContent } from '@/store/post/postContentSlice';
import Skeleton from '@/components/SkeletonItem';

const BlogPost = () => {
  const [differ, setDiffer] = useState<boolean>(true)
  const dispatch = useAppDispatch();
  const { postContent, isLoading } = useAppSelector(state => state.postContentSlice)
  const { posts } = useAppSelector(state => state.postSlice.postData)
  const pathName = usePathname();
  const post = useRef(posts[decodeURI(pathName).split("/post/")[1]]).current;
  useEffect(() => {
    const header = document.getElementsByTagName('header')[0] as HTMLElement
    dispatch(fetchPostContent(decodeURI(pathName)));
    window.scrollTo(0, header.offsetHeight);
    setTimeout(() => {
      setDiffer(false)
    }, 1500)
    console.log(post);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading && (isLoading || differ)) {
    return (
      <div className="flex flex-col gap-12 items-center">
        <div className="m-12">
          <Skeleton width={550} height={72} />
        </div>
        <div>
          <Skeleton width={1100} height={1000} />
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`relative flex flex-col items-center rounded-lg`}
      >
        <PostContainer>
          <MarkdownPreview
            postContent={postContent}
            pathName={pathName}
            post={post}
          />
        </PostContainer>
      </div>
    );
  }
}

export default BlogPost