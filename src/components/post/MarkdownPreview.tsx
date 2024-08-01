'use client'
import React, { ReactElement, ReactHTMLElement, useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight';


import rehypeRaw from 'rehype-raw'; //마크다운안의 html코드 분석
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import {remark} from 'remark'

import "highlight.js/styles/github-dark.css";
import { PostData } from '@/store/post/postSlice';
import gsap from 'gsap';
import { removeNumbering } from '@/lib/post';

interface IMarkdownPreview {
  postContent: string;
  pathName: string;
  post: PostData;
}

const reg = new RegExp(/^(#{1,6}) /, "g");

const MarkdownPreview: React.FC<IMarkdownPreview> = ({ postContent, pathName, post }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [spyOffsetTops,setSpyOffsetTops] = useState<number[]>([])
  const postTitles = postContent.split("\n").filter((line) => line.match(reg))
  const onClickListItme = (index: number) => {
    const header = document.getElementsByTagName("header")[0] as HTMLElement
    gsap.to(window, {
      duration: 0.5,
      scrollTo: header.offsetHeight + spyOffsetTops[index],
    });
  }
  useEffect(() => {
    const spyOffsetTops: number[] = [];
    document.querySelectorAll(".post-scroll-spy").forEach(el => {
      spyOffsetTops.push((el as HTMLElement).offsetTop);
    })
    setSpyOffsetTops([...spyOffsetTops]);
  },[])
  return (
    <div>
      <div ref={divRef}>
        <div className="flex flex-col items-center gap-3 py-12 mb-12 border-b-[1.5px] border-[#1e293b] border-opacity-35">
          <h1 className="z-[30] w-full text-slate-800 text-[4rem] text-center font-[900]">
            {decodeURI(pathName.slice(pathName.lastIndexOf("/") + 1, -3))}
          </h1>
          <p className='pb-12 text-[1.5rem] font-[600] opacity-60'>{decodeURI(pathName.slice(6, -3)).split("/").map(text=>removeNumbering(text)).join(" > ")}</p>
          <p>
            {post.writer} · {post.createdAt}
          </p>
          <div className="flex gap-2 py-2">
            {post.tags.map((tag, i) => (
              <div
                className="p-2 py-1 bg-slate-700 text-[1.5rem] text-gray-200 rounded-lg"
                key={i}
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="p-6 bg-slate-400 text-[1.5rem] font-[500] rounded-lg">
            {post.discription}
          </p>
        </div>
        <div className="flex flex-col items-center w-full h-[450px] mb-12">
          <h1 className="w-[800px] px-3 py-2 bg-slate-600 text-[2rem] font-[600] text-gray-200 rounded-t-lg">
            목차
          </h1>
          <ul className="w-[800px] border-[1.2px] border-[#475569] border-t-0 border-opacity-30 rounded-b-lg overflow-x-hidden overflow-y-auto">
            {postTitles.map((postTitle, i) => {
              const formatTitle = postTitle.replaceAll("#", "").slice(1);
              const num = postTitle.split("").filter(text=>text==="#")
              return (
                <li
                  style={{paddingLeft:`${num.length}rem`}}
                  className="w-full py-1 border-[#475569] text-[1.5rem] border-opacity-30 border-b-[1.2px] hover:cursor-pointer hover:font-bold"
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
                <h1 className="post-scroll-spy block bg-slate-700 p-3 text-[3rem] text-gray-200 font-bold rounded-t-xl">
                  {children}
                </h1>
              </>
            );
          },
          h2({ children }) {
            return (
              <h1 className="post-scroll-spy p-3 text-[3rem] font-bold">
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
            return <ul className="px-12 text-[1.5rem] font-[600]">{children}</ul>;
          },
          li({ children }) {
            return <li className='list-disc'>{children}</li>
          },
          table({ children }) {
            return (
              <table className="block w-[1100px] my-3 rounded-lg text-[1.5rem] font-[600] ">
                {children}
              </table>
            );
          },
          thead({ children }) {
            return (
              <thead className="p-3 bg-slate-600 text-[1.2rem] font-[600] text-gray-200">
                {children}
              </thead>
            );
          },
          th({ children }) {
            return <th className="min-w-[5rem] px-2 py-3">{children}</th>;
          },
          tr({ children }) {
            return (
              <tr className="border-slate-600 border-b-2 border-opacity-30 last:border-none">
                {children}
              </tr>
            );
          },
          td({ children }) {
            return <td className="min-w-[5rem] p-1">{children}</td>;
          },
          code({ children, className }) {
            return (
              <>
                {className ? (
                  <div className="px-3 py-4">
                    <div className="bg-slate-700 rounded-lg overflow-hidden">
                      <div className="px-2 py-3">
                        <h3 className="font-bold text-gray-200">
                          {className?.slice(className.lastIndexOf("-") + 1)}
                        </h3>
                      </div>
                      <code className={`${className}`}>{children}</code>
                    </div>
                  </div>
                ) : (
                  <span className="px-2 py-1 bg-slate-700 text-gray-200 font-[600] rounded-lg">{children}</span>
                )}
              </>
            );
          },
        }}
      >
        {postContent}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownPreview