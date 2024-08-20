import IndexContainer from "@/components/layout/IndexContainer";
import MarkdownPreview from "./MarkdownPreview";

const BlogPost = () => {
  return (
    <IndexContainer containerTailwindCss="w-[100vw] bg-blog-white">
      <MarkdownPreview />
    </IndexContainer>
  );
};

export default BlogPost;
