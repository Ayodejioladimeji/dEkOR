import React, { useContext, useEffect, useState } from "react";
import CardSkeleton from "@/common/cardskeleton";
import { GetRequests } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import Layout from "@/components/Layout";
import Breadcumb from "@/common/breadcumb";
import Categorycard from "@/common/categorycard";
import { useRouter } from "next/router";
import Paginate from "@/components/pagination/Paginate";

/* eslint-disable */

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const { state, dispatch } = useContext(DataContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 20;
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const fetchCategories = async () => {
      const res = await GetRequests(
        `/category?page=${page === undefined ? currentPage : page}&pageSize=${PageSize}`,
        token
      );

      if (res?.status === 200 || res?.status === 201) {
        setCategories(res?.data?.data);
        setTotalCount(res?.data?.totalCount);
        dispatch({ type: ACTIONS.LOADING, payload: false });

        if (page === undefined) {
          setCurrentPage(1);
        }

        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch, state?.callback, page]);

  //

  return (
    <Layout>
      <div className="all-categories">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="All Categories" />
          </div>

          <div className="category-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {categories?.map((item: any) => {
                  return <Categorycard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && categories?.length === 0 && (
            <div
              style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <i
                className="bi bi-box-seam-fill"
                style={{ fontSize: "45px" }}
              ></i>
              No Category Available
            </div>
          )}

          {/* pagination */}
          {!loading && categories?.length !== 0 && totalCount > PageSize && (
            <div className="page-navigation">
              <div className="mt-3">
                <Paginate
                  className="pagination-bar"
                  currentPage={
                    !loading && page === undefined ? currentPage : Number(page)
                  }
                  totalCount={totalCount}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
