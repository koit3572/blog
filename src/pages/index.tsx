import { Inter } from "next/font/google";
import BlogInfo from "@/components/home/BlogInfo";
import MyResume from "@/components/home/MyResume";
import RootDirMenu from "@/components/home/RootDirMenu";
import RecommendedPostList from "@/components/home/RecommendedPostList";
import LatestPostList from "@/components/home/LatestPostList";
import RandomPostList from "@/components/home/RandomPostList";
import IndexContainer from "@/components/layout/IndexContainer";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <IndexContainer>
      <BlogInfo />
      <MyResume />
      <RootDirMenu />
      <RecommendedPostList />
      <LatestPostList />
      <RandomPostList />
    </IndexContainer>
  );
}
