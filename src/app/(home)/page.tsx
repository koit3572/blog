'use client'
import gsap from "gsap";
import BlogInfo from "./BlogInfo";
import LatestPostList from "./LatestPostList";
import MyResume from "./MyResume";
import RandomPostList from "./RandomPostList";
import RecommendedPostList from "./RecommendedPostList";
import RootDirMenu from "./RootDirMenu";
import { usePathname } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  useEffect(() => {
    console.log(1)
    window.scrollTo(0,0)
  },[])
  return (
    <div className="w-full h-full">
      <div className="flex justify-center items-center w-full h-[35rem]">
        <div className="w-[1100px]">
          <BlogInfo />
        </div>
      </div>
      <div className="pt-28">
        <MyResume />
      </div>
      <div className="flex justify-center pt-[25rem]">
        <RootDirMenu />
      </div>
      <div className='pt-[12rem]'>
        <RecommendedPostList/>
      </div>
      <div>
        <LatestPostList />
      </div>
      <div>
        <RandomPostList />
      </div>
    </div>
  );
}
