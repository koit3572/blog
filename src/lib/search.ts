import { PostData } from "@/store/post/postSlice";
import { removeNumbering } from "./post";

interface IGetSearchRankingParamses {
  posts: {
    [postPath: string]: PostData;
  };
  search: string;
}
export const getSearchRanking = async ({ posts, search }: IGetSearchRankingParamses): Promise<{ [key:string]:string[] }> => {
  const keys = Object.keys(posts);
  const searchRanking: { [key: string]: string[] } = [
    ...new Array(keys.length),
  ].reduce((acc1, _, i) => {
    const post = posts[keys[i] as keyof typeof posts];
    if (Object.keys(post).length !== 1) {
      const category = [...keys[i].split("/")].reduce((acc2, category) => {
        return (acc2 = [...acc2, removeNumbering(category).split(".md")[0]]);
      }, [] as string[]);
      const tags = [...(post.tags as string[])];
      const tagOrCategorys = [
        ...new Set([...category.slice(0, category.length - 1), ...tags]),
      ];

      const includeSearch = tagOrCategorys.reduce((acc3, tagOrCategory) => {
        const isInclude = search
          .toLowerCase()
          .replaceAll(" ", "")
          .includes(tagOrCategory.toLowerCase().replaceAll(" ", ""));

        if (isInclude) {
          console.log("return");
          return (acc3 = [...acc3, tagOrCategory]);
        }
        return (acc3 = acc3);
      }, [] as string[]);

      if (includeSearch.length !== 0) {
        if (Object.keys(acc1).includes(keys[i])) {
          return (acc1 = {
            ...acc1,
            [keys[i]]: [...acc1[keys[i]], ...includeSearch],
          });
        } else {
          return (acc1 = {
            ...acc1,
            [keys[i]]: [...includeSearch],
          });
        }
      }
      return acc1;
    }
    return acc1;
  }, {});
  return searchRanking;
};