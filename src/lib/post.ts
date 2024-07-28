import path from "path"
import fs from 'fs'
import matter from "gray-matter";

interface IGetPostFolderStructure {
  [fileOrDir: string]: (dirpath:string)=>IGetPostFolderStructure | string;
}
// post의 파일과 폴더들이 들어있는 root폴더의 path 가져오기
export const rootPath = path.join(process.cwd(), "src/post/")

// 특정 폴더의 fullPath가져오기
export const getFullPath = (dirPath: string) => {
  return path.join(rootPath, dirPath);
};

// 폴더나 파일 앞에 붙은 넘버링 제거
export const removeNumbering = (name: string) => {
  return name.replace(/^[0-9]+./, "");
}

// 특정 post폴더의 최상위 폴더 가져오기
export const getRootDirNames = (dirPath: string = rootPath) => {
  const fullPath = rootPath === dirPath ? dirPath : getFullPath(dirPath);
  try {
    if (fs.statSync(fullPath).isDirectory()) {
      return fs.readdirSync(fullPath);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

// post의 폴더와 파일의 모든 구조를 가져오기
export const getPostFolderStructure = (
  dirpath: string = rootPath
) => {
  const fileNames = fs.readdirSync(dirpath);
  const postFolderStructure: IGetPostFolderStructure = fileNames.reduce(
    (acc, fileName) => {
      const fullPath = path.join(dirpath, fileName);
      if (fs.statSync(fullPath).isDirectory()) {
        return (acc = {
          ...acc,
          [fileName]: getPostFolderStructure(fullPath),
        });
      } else {
        if (fileName.lastIndexOf(".md") !== -1 && fileName!=='list.md') {
         return (acc = {
           ...acc,
           [fileName]: fileName,
         }); 
        }
        return acc
      }
    },
    {}
  );
  return postFolderStructure;
};

// .md확장자를 가진 파일의 경로(string)를 배열로 묶어, 배열로 감싸 반환
export const getAllPostPaths = (currentPath: string = rootPath, paths: string[] = []) => {
  try {
    const formatPath = currentPath.replace(/^.*src\\post\\/, "");
    const dirNameList: string[] = getRootDirNames(formatPath)!;
    const result:string[][] = dirNameList.reduce((acc, dirName) => {
      const fullPath = path.join(currentPath, dirName)
      if (fs.statSync(fullPath).isDirectory()) {
        return (acc = [...acc, ...getAllPostPaths(fullPath, [...paths,dirName])!]);
      } else if ((dirName !== "list.md") && (dirName.lastIndexOf(".md")!==-1)) {
        return (acc = [...acc, [...paths, dirName]]);
      } else {
        return acc
      }
    }, [] as string[][])
    return result;
  } catch (error) {
    console.log(error)
  }
}

// .md파일 JavaScript 데이터로 변환
export const getPostData = (postPath: string) => {
  const fullPostPath = getFullPath(postPath.replace("api/post", ""));
  const fileContents = fs.readFileSync(fullPostPath, "utf-8");
  const matterData = matter(fileContents);
  return matterData;
}

// postTitle 편집
export const getPostTitleformat = (postPath: string) => {
  const postPathList = postPath.split('/').filter(path => path !== '')
  const formatPath =
    postPathList.length > 3
      ? [...postPathList]
          .splice(2,)
          .reduce((acc, path, i) => {
            if ([...postPathList].splice(2).length-1 === i) {
              return (acc += path);
            }
            return (acc += `[${path}]`);
          }, "")
          .slice(0, -3)
      : postPathList[postPathList.length - 1].slice(0, -3);
  return formatPath
}