import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { IMenu, IPosts } from "@/types/post";

// post가 들어있는 폴더와 파일이 들어있는 root폴더 경로 반환
const rootPath = path.join(process.cwd(), "src/post");

// .md파일 Javascript 객체로 변환
const getPostInfo = (postPath: string) => {
  const fileContents = fs.readFileSync(postPath, "utf-8");
  const matterData = matter(fileContents);
  return matterData;
};

//객체 구조를 path로 변경하여 string[]로 반환
export const getPostPaths = (postPath: string = "") => {
  const fullPath = path.join(rootPath, postPath);
  const rootDirs = fs.readdirSync(fullPath);
  const postPaths: string[] = rootDirs.reduce(
    (postPathsAcc: string[], rootDir: string) => {
      const currentPostPath = path.join(postPath, rootDir);
      const currentFullPath = path.join(fullPath, rootDir);
      const isDirectory = fs.statSync(currentFullPath).isDirectory();
      if (isDirectory) {
        return (postPathsAcc = [
          ...postPathsAcc,
          ...getPostPaths(currentPostPath),
        ]);
      } else if (/(\.md)$/.test(rootDir) && rootDir !== "list.md") {
        return (postPathsAcc = [...postPathsAcc, currentPostPath]);
      } else {
        return postPathsAcc;
      }
    },
    [] as string[],
  );
  return postPaths;
};
export const getFileName = (postPath: string) => {
  const fileName = path.parse(postPath).name;
  return fileName;
};
export const getFormatTitle = (title: string[] | string, skip: number = 0) => {
  const defaultTitle = typeof title === "object" ? title : title.split(/\\|\//);
  const formatTitle = defaultTitle.reduce((titleAcc, text, i) => {
    const formatText = getFormatText(text);
    if (i > skip) {
      if (i === defaultTitle.length - 1) {
        const resultText = `${formatText}`;
        return (titleAcc = titleAcc + resultText);
      } else {
        const resultText = `[${formatText}]`;
        return (titleAcc = titleAcc + resultText);
      }
    } else {
      return titleAcc;
    }
  }, "");
  return formatTitle;
};
// postPath배열을 postPath:postInfo 구조의 객체 반환
export const getPosts = (postPaths: string[] = getPostPaths()) => {
  const posts = postPaths.reduce((postsAcc: IPosts, postPath: string) => {
    const fullPath = path.join(rootPath, postPath);
    const postInfo = getPostInfo(fullPath);
    const category = postPath
      .split(/\\|\//)
      .filter((value) => value !== "")
      .reduce((categoryAcc, text) => {
        const formatText = getFormatText(text);
        return (categoryAcc = [...categoryAcc, formatText]);
      }, [] as string[]);
    const title = getFormatTitle(category, 1);
    const relatedSearchTerms = postInfo.content
      .split("\n")
      .filter((text) => text.match(/^(#{2,6})/))
      .reduce((relatedSearchTermsAcc, text) => {
        const formatText = getFormatText(text);
        return (relatedSearchTermsAcc = [...relatedSearchTermsAcc, formatText]);
      }, [] as string[]);
    return (postsAcc = {
      ...postsAcc,
      [postPath]: {
        path: postPath,
        title: title,
        description: postInfo.data.description,
        writer: "koit",
        createdAt: postInfo.data.createdAt,
        tags: postInfo.data.tags ? postInfo.data.tags : [],
        category: category,
        relatedSearchTerms: relatedSearchTerms,
        isFavorite: postInfo.data.isFavorite,
        content: postInfo.content,
      },
    });
  }, {});
  return posts;
};

// 조건(path)에 맞는 post만 따로 모아 객체로 반환
export const getFilterPosts = (
  rootPath: string,
  posts: IPosts = getPosts(),
) => {
  const keys = Object.keys(posts);
  const filterPosts = keys.reduce((filterPostsAcc, key) => {
    const formatRootPath = getFormatPath(rootPath);
    const formatKey = getFormatPath(key);
    if (formatKey.includes(formatRootPath)) {
      return (filterPostsAcc = {
        ...filterPostsAcc,
        [key]: posts[key],
      });
    }
    return filterPostsAcc;
  }, {} as IPosts);
  return filterPosts;
};

// path.join을 통해 경로 포맷
export const getFormatPath = (postPath: string | string[]) => {
  const defaultPath =
    typeof postPath === "string" ? postPath.split(/\\|\//) : postPath;
  const formatPath = defaultPath.reduce(
    (formatPathAcc: string, text: string) => {
      return (formatPathAcc =
        formatPathAcc === "" ? text : path.join(formatPathAcc, text));
    },
    "",
  );
  return formatPath;
};

// category및 post의 넘버링 및 .md 삭제
export const getFormatText = (text: string) => {
  const formatText = text.replace(/(\.md)$/, "").replace(/^([1-9]+\.)/, "");
  return formatText;
};

// layout에서 사용할 menu데이터
export const getMenu = (): IMenu => {
  const rootDirNameList = fs.readdirSync(rootPath);
  const menu: IMenu = rootDirNameList.reduce((acc: IMenu, DirName: string) => {
    const curDirPath = path.join(rootPath, DirName);
    const curDirNameLsit = fs.readdirSync(curDirPath);
    return (acc = {
      ...acc,
      [DirName]: [...curDirNameLsit],
    });
  }, {});
  return menu;
};

export const getFormatdescription = (text: string) => {
  const description = text || "해당 포스트에 대한 설명이 없습니다.";
  const isOverFlow = description!.length > 45;
  const formatdescription = isOverFlow
    ? description.length === 45
      ? description.substring(0, 45)
      : description.substring(0, 45) + "..."
    : description;
  return formatdescription;
};
