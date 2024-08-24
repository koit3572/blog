"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import gsap from "gsap";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/redux";
import useComponentSize from "@/hooks/useComponentSize";
import { getFormatTitle } from "@/lib/post";

const MarkdownPreview = () => {
  const query = useSearchParams().get("path");
  const { posts } = useAppSelector((state) => state.postSlice);
  const divRef = useRef<HTMLDivElement>(null);
  const [post, setPost] = useState(posts[query as keyof typeof posts]);
  const [spyOffsetTops, setSpyOffsetTops] = useState<number[]>([]);
  const onClickListItme = (index: number) => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: spyOffsetTops[index],
    });
  };
  const [container, size] = useComponentSize({ throttleTime: 300 });
  useEffect(() => {
    const spyOffsetTops: number[] = [];
    Object.keys(container.current?.children!).reduce(
      (spyOffsetTopsAcc, _, index) => {
        if (
          container.current?.children![index].className.includes(
            "post-scroll-spy",
          )
        ) {
          spyOffsetTops.push(spyOffsetTopsAcc);
        }
        return (spyOffsetTopsAcc =
          spyOffsetTopsAcc +
          (container.current?.children![index] as HTMLElement).offsetHeight);
      },
      container.current?.offsetTop! as number,
    );
    setSpyOffsetTops(spyOffsetTops);
  }, [size]);

  useEffect(() => {
    setPost(posts[query as keyof typeof posts]);
  }, [posts, query]);
  return (
    <div ref={container} className="max-w-[calc(100vw-3rem)] overflow-hidden">
      <div ref={divRef} className="flex flex-col items-center">
        <div className="mb-12 flex w-full flex-col items-center gap-3 border-b-[1.5px] border-[#1e293b] border-opacity-35 py-12">
          <h1 className="z-[30] w-full text-center text-[3.5rem] font-[900] text-slate-800">
            {post.title}
          </h1>
          <p className="pb-12 text-[1.5rem] font-[600] opacity-60">
            {post.category.join(" > ")}
          </p>
          <p>
            {post.writer} · {post.createdAt}
          </p>
          <div className="flex flex-wrap justify-center gap-2 py-2">
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
        <div className="flex max-h-[250px] w-[50rem] max-w-[calc(100vw-3rem)] flex-col items-center">
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
              <div className="pt-12">
                <h1 className="block rounded-t-xl bg-slate-700 p-3 text-[3rem] font-bold text-gray-200">
                  {children}
                </h1>
              </div>
            );
          },
          h2({ children }) {
            return (
              <div className="post-scroll-spy py-4">
                <h2 className="border-b-[1.2px] border-[#475569] p-3 text-[3rem] font-bold">
                  {children}
                </h2>
              </div>
            );
          },
          h3({ children }) {
            return (
              <h3 className="post-scroll-spy p-3 text-[2.5rem] font-bold">
                {children}
              </h3>
            );
          },
          h4({ children }) {
            return (
              <h4 className="post-scroll-spy p-3 text-[2rem] font-bold">
                {children}
              </h4>
            );
          },
          h5({ children }) {
            return (
              <h5 className="post-scroll-spy p-3 text-[1.5rem] font-bold">
                {children}
              </h5>
            );
          },
          p({ children }) {
            return <p className="px-6 text-[1.5rem]">{children}</p>;
          },
          ul({ children }) {
            return (
              <ul className="list-disc px-12 text-[1.5rem] font-[600]">
                {children}
              </ul>
            );
          },
          ol({ children }) {
            return (
              <ol className="list-decimal px-12 text-[1.5rem] font-[600]">
                {children}
              </ol>
            );
          },
          li({ children }) {
            return <li>{children}</li>;
          },
          table({ children }) {
            return (
              <div className="py-3">
                <table className="block max-w-[100vw] overflow-hidden rounded-lg rounded-t-xl text-[1.5rem] font-[600]">
                  {children}
                </table>
              </div>
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
