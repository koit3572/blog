"use client";
import { ApiResPostData } from "@/pages/api/post";
import { setPostData } from "@/store/post/postSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

interface ReduxDefaultSet {
  pageProps: ApiResPostData;
  children: React.ReactNode;
}
const ReduxDefaultSet: React.FC<ReduxDefaultSet> = ({
  pageProps,
  children,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPostData(pageProps));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{children}</>;
};

export default ReduxDefaultSet;
