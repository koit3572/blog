"use client";
import { PostInfo } from "@/types/post";
import { getFormatText, getFormatTitle } from "./post";

interface IGetSearchRankingParamses {
  posts: {
    [postPath: string]: PostInfo;
  };
  search: string;
}
export const getSearchRanking = async ({
  posts,
  search,
}: IGetSearchRankingParamses): Promise<{ [key: string]: string[] }> => {
  const keys = Object.keys(posts);
  const searchRanking: { [key: string]: string[] } = [
    ...new Array(keys.length),
  ].reduce((searchRankingAcc, _, i) => {
    const post = posts[keys[i]];
    if (Object.keys(post).length !== 0) {
      console.log(post.tags);
      const tagOrCategorys = [...new Set([...post.category, ...post.tags])];
      const includeSearch = tagOrCategorys.filter(
        (tagOrCategory) =>
          tagOrCategory
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase().replaceAll(" ", "")) !== -1 ||
          search
            .toLowerCase()
            .replaceAll(" ", "")
            .includes(tagOrCategory.toLowerCase().replaceAll(" ", "")),
      );

      if (includeSearch.length !== 0) {
        if (Object.keys(searchRankingAcc).includes(keys[i])) {
          return (searchRankingAcc = {
            ...searchRankingAcc,
            [keys[i]]: [...searchRankingAcc[keys[i]], ...includeSearch],
          });
        } else {
          return (searchRankingAcc = {
            ...searchRankingAcc,
            [keys[i]]: [...includeSearch],
          });
        }
      }
      return searchRankingAcc;
    }
    return searchRankingAcc;
  }, {});
  return searchRanking;
};
