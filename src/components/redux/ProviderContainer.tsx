"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchPost } from "@/store/post/postSlice";
import React, { useEffect } from "react";
interface IProviderContainer {
  children: React.ReactNode;
}
const ProviderContainer: React.FC<IProviderContainer> = ({ children }) => {
  const { isLoading } = useAppSelector((state) => state.postSlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPost());
  }, []);
  return <>{!isLoading ? children : null}</>;
};

export default ProviderContainer;
