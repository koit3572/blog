// common
export interface IPostFolderStructure {
  [fileOrDir: string]: IPostFolderStructure | PostInfo;
}
export interface PostInfo {
  path: string; // 1.개요/IT지식/정규표현식(Regex).md
  title: string; // 정규표현식(Regex).md >
  discription: string;
  writer: string;
  createdAt: string;
  tags: string[];
  category: string[];
  relatedSearchTerms: string[];
  content: string;
  isFavorite: boolean;
}
export const postInfoKeys = [
  "path",
  "title",
  "discription",
  "writer",
  "createdAt",
  "tags",
  "category",
  "relatedSearchTerms",
  "content",
  "isFavorite",
];
export interface IMenu {
  [key: string]: IMenu | string[];
}
export interface IPosts {
  [key: string]: PostInfo;
}

// redux
export interface IInitialState {
  posts: IPosts;
  menu: IMenu;
  error: string;
}

// api
export interface ApiResPostData {
  postFolderStructure: IPostFolderStructure;
  postPaths: string[];
  error: string;
}
export interface ApiResApp {
  posts: IPosts;
  menu: IMenu;
  error: string;
}
