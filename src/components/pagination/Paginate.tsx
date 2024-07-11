import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { UsePagination, DOTS } from "./Usepagination";
import { useRouter } from "next/router";
import { screenPixels } from "@/utils/utils";

//

const Paginate = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
    loading,
    setLoading,
  } = props;
  const [device, setDevice] = useState(false);
  const router = useRouter();

  useEffect(() => {
    screenPixels("375px", setDevice);
  }, []);

  const paginationRange = UsePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    setLoading(true);
    onPageChange(currentPage + 1);
    router.push(`${router.route}?page=${currentPage + 1}`);
  };

  const onPrevious = () => {
    setLoading(true);
    onPageChange(currentPage - 1);
    router.push(`${router.route}?page=${currentPage - 1}`);
  };

  const numChange = (pageNumber: number) => {
    setLoading(true);
    onPageChange(pageNumber);
    router.push(`${router.route}?page=${pageNumber}`);
  };

  let lastPage =
    !loading &&
    currentPage !== undefined &&
    paginationRange[paginationRange?.length - 1];

  return (
    <ul
      className={classnames("pagination-container", { [className]: className })}
    >
      {!device && (
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <div className="arrow left" />
        </li>
      )}

      {/* {!device && ( */}
      <>
        {paginationRange?.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index} className="pagination-item dots">
                &#8230;
              </li>
            );
          }

          return (
            <li
              key={index}
              className={classnames("pagination-item", {
                selected: pageNumber === currentPage,
              })}
              onClick={() => numChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
      </>
      {/* )} */}

      {!device && (
        <li
          className={classnames("pagination-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <div className="arrow right" />
        </li>
      )}
    </ul>
  );
};

export default Paginate;
