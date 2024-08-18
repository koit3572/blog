import IndexContainer from "@/components/layout/IndexContainer";
import { useAppSelector } from "@/hooks/redux";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MarkdownPreview from "./MarkdownPreview";

const BlogPost = () => {
  return (
    <IndexContainer containerTailwindCss="w-[100vw] bg-blog-white">
      <MarkdownPreview />
    </IndexContainer>
  );
};

export default BlogPost;
