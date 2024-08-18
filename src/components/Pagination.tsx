"use client";
import React, { useEffect, useState } from "react";
interface IPaginationProps {
  itemlength: number;
  maxPaginationNum: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  style?: {
    paginationController?: {
      common?: string;
      prev?: string;
      next?: string;
    };
    paginationNumber?: {
      common?: string;
      isActive?: string;
      noActive?: string;
    };
  };
}
const defaultStyle = {
  paginationController: {
    common: "font-bold hover:cursor-pointer",
    prev: "prev absolute left-[-2rem]",
    next: "next absolute right-[-2rem]",
  },
  paginationNumber: {
    common: "flex justify-center w-8 hover:cursor-pointer font-bold",
    isActive: "font-bold text-red-500",
    noActive: "",
  },
};

const Pagination: React.FC<IPaginationProps> = ({
  itemlength,
  maxPaginationNum,
  currentIndex,
  setCurrentIndex,
  style,
}) => {
  const formatStyle = {
    paginationController: {
      common: style?.paginationController?.common
        ? style?.paginationController?.common
        : defaultStyle.paginationController.common,
      prev: style?.paginationController?.prev
        ? `prev ${style?.paginationController?.prev}`
        : defaultStyle.paginationController.prev,
      next: style?.paginationController?.next
        ? `next ${style?.paginationController?.next}`
        : defaultStyle.paginationController.next,
    },
    paginationNumber: {
      common: style?.paginationNumber?.common
        ? style?.paginationNumber?.common
        : defaultStyle.paginationNumber.common,
      isActive: style?.paginationNumber?.isActive
        ? style?.paginationNumber?.isActive
        : defaultStyle.paginationNumber.isActive,
      noActive: style?.paginationNumber?.noActive
        ? style?.paginationNumber?.noActive
        : defaultStyle.paginationNumber.noActive,
    },
  };
  const [pagination, setPagination] = useState<number[]>([]);
  useEffect(() => {
    const arr = new Array(itemlength);
    setPagination([...arr].splice(0, maxPaginationNum).map((_, i) => i + 1));
  }, [itemlength, maxPaginationNum]);
  const updatePaginationData = (num: number) => {
    const currentPagination = pagination.map((_, i) => {
      if (pagination[pagination.length - 1] === num && itemlength - 1 >= num) {
        return pagination[i] + 1;
      } else if (pagination[0] === num && num !== 1) {
        return pagination[i] - 1;
      } else {
        return pagination[i];
      }
    });
    setCurrentIndex(num);
    setPagination(currentPagination);
  };
  const handleOnClickPagination = (num: number) => {
    if (currentIndex !== num) updatePaginationData(num);
  };
  const handleOnclickNextOrPrev = (str: "next" | "prev") => {
    if (str === "next" && currentIndex + 1 !== itemlength + 1) {
      return handleOnClickPagination(currentIndex + 1);
    } else if (str === "prev" && currentIndex - 1 !== 0) {
      return handleOnClickPagination(currentIndex - 1);
    }
  };
  return (
    <div className="relative flex text-white">
      {pagination.map((num) => (
        <div
          key={num}
          onClick={() => handleOnClickPagination(num)}
          className={`${
            num === currentIndex
              ? formatStyle.paginationNumber.isActive
              : formatStyle.paginationNumber.noActive
          } ${formatStyle.paginationNumber.common}`}
        >
          {num}
        </div>
      ))}
      <div
        onClick={() => handleOnclickNextOrPrev("next")}
        className={`${formatStyle.paginationController.next} ${formatStyle.paginationController.common}`}
      >
        {">"}
      </div>
      <div
        onClick={() => handleOnclickNextOrPrev("prev")}
        className={`${formatStyle.paginationController.prev} ${formatStyle.paginationController.common}`}
      >
        {"<"}
      </div>
    </div>
  );
};

export default Pagination;
