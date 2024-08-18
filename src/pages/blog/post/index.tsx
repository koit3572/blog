"use client";
import IndexContainer from "@/components/layout/IndexContainer";
import { useAppSelector } from "@/hooks/redux";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownPreview from "./MarkdownPreview";

const BlogPost = () => {
  const query = useSearchParams().get("path");
  const { posts } = useAppSelector((state) => state.postSlice);
  const [post, setPost] = useState(posts[query as keyof typeof posts]);
  console.log(query);
  useEffect(() => {
    setPost(posts[query as keyof typeof posts]);
  }, [posts, query]);
  return (
    <IndexContainer containerTailwindCss="w-[100vw] bg-blog-white">
      <MarkdownPreview post={post} />
    </IndexContainer>
  );
};

export default BlogPost;
