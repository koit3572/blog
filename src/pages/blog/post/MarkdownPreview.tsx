"use client";
import { PostInfo } from "@/types/post";
import React, { useEffect, useRef, useState } from "react";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";

const MarkdownPreview = () => {
  const query = useSearchParams().get("path")?.replaceAll("\\", "/");
  const { posts } = useAppSelector((state) => state.postSlice);
  const [post, setPost] = useState(posts[query as keyof typeof posts]);
  const divRef = useRef<HTMLDivElement>(null);
  const [spyOffsetTops, setSpyOffsetTops] = useState<number[]>([]);
  const onClickListItme = (index: number) => {
    //const header = document.getElementsByTagName("header")[0] as HTMLElement;
    gsap.to(window, {
      duration: 0.5,
      scrollTo: 800 + spyOffsetTops[index],
    });
  };
  useEffect(() => {
    const spyOffsetTops: number[] = [];
    document.querySelectorAll(".post-scroll-spy").forEach((el) => {
      spyOffsetTops.push((el as HTMLElement).offsetTop);
    });
    console.log(post);
    setSpyOffsetTops([...spyOffsetTops]);
  }, [post]);
  useEffect(() => {
    setPost(posts[query as keyof typeof posts]);
  }, [posts, query]);
  return (
    <div className="max-w-[100vw]">
      <div ref={divRef} className="flex flex-col items-center">
        <div className="mb-12 flex flex-col items-center gap-3 border-b-[1.5px] border-[#1e293b] border-opacity-35 py-12">
          <h1 className="z-[30] w-full text-center text-[4rem] font-[900] text-slate-800">
            {post.title}
          </h1>
          <p className="pb-12 text-[1.5rem] font-[600] opacity-60">
            {post.category.join(" > ")}
          </p>
          <p>
            {post.writer} · {post.createdAt}
          </p>
          <div className="hidden gap-2 py-2 xl:flex">
            {post.tags.map((tag, i) => (
              <div
                className="rounded-lg bg-slate-700 p-2 py-1 text-[1.5rem] text-gray-200"
                key={i}
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="rounded-lg bg-slate-400 p-6 text-[1.5rem] font-[500]">
            {post.discription}
          </p>
        </div>
        <div className="mb-12 flex h-[450px] w-[800px] max-w-[100vw] flex-col items-center">
          <h1 className="w-full rounded-t-lg bg-slate-600 px-3 py-2 text-[2rem] font-[600] text-gray-200">
            목차
          </h1>
          <ul className="w-full overflow-y-auto overflow-x-hidden rounded-b-lg border-[1.2px] border-t-0 border-[#475569] border-opacity-30">
            {post.relatedSearchTerms.map((postTitle, i) => {
              const formatTitle = postTitle.replaceAll("#", "").slice(1);
              const num = postTitle.split("").filter((text) => text === "#");
              return (
                <li
                  style={{ paddingLeft: `${num.length}rem` }}
                  className="w-full border-b-[1.2px] border-[#475569] border-opacity-30 py-1 text-[1.5rem] hover:cursor-pointer hover:font-bold"
                  key={i}
                  onClick={() => onClickListItme(i)}
                >
                  {formatTitle}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <ReactMarkdown
        rehypePlugins={[rehypeHighlight, remarkGfm]}
        components={{
          h1({ children }) {
            return (
              <>
                <br />
                <br />
                <h1 className="post-scroll-spy mt-12 block rounded-t-xl bg-slate-700 p-3 text-[3rem] font-bold text-gray-200">
                  {children}
                </h1>
              </>
            );
          },
          h2({ children }) {
            return (
              <h1 className="post-scroll-spy my-4 border-b-[1.2px] border-[#475569] p-3 text-[3rem] font-bold">
                {children}
              </h1>
            );
          },
          h3({ children }) {
            return (
              <h1 className="post-scroll-spy p-3 text-[2.5rem] font-bold">
                {children}
              </h1>
            );
          },
          h4({ children }) {
            return (
              <h1 className="post-scroll-spy p-3 text-[2rem] font-bold">
                {children}
              </h1>
            );
          },
          h5({ children }) {
            return (
              <h1 className="post-scroll-spy p-3 text-[1.5rem] font-bold">
                {children}
              </h1>
            );
          },
          ul({ children }) {
            return (
              <ul className="px-12 text-[1.5rem] font-[600]">{children}</ul>
            );
          },
          li({ children }) {
            return <li className="list-disc">{children}</li>;
          },
          table({ children }) {
            return (
              <table className="my-3 block max-w-[100vw] overflow-hidden rounded-lg rounded-t-xl text-[1.5rem] font-[600]">
                {children}
              </table>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-slate-600 p-3 text-[1.2rem] font-[600] text-gray-200">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return <th className="px-2 py-3">{children}</th>;
          },
          tr({ children }) {
            return (
              <tr className="border-b-2 border-slate-600 border-opacity-30 last:border-none">
                {children}
              </tr>
            );
          },
          td({ children }) {
            return <td className="px-4 py-2">{children}</td>;
          },
          code({ children, className }) {
            return (
              <>
                {className ? (
                  <div className="px-3 py-4">
                    <div className="overflow-hidden rounded-lg bg-slate-700">
                      <div className="px-2 py-3">
                        <h3 className="font-bold text-gray-200">
                          {className?.slice(className.lastIndexOf("-") + 1)}
                        </h3>
                      </div>
                      <code className={`${className}`}>{children}</code>
                    </div>
                  </div>
                ) : (
                  <span className="rounded-lg bg-slate-700 px-2 py-1 font-[600] text-gray-200">
                    {children}
                  </span>
                )}
              </>
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview;
