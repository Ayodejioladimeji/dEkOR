import React, { useEffect, useState } from "react";
import Breadcumb from "../../common/breadcumb";
import Layout from "../../components/Layout";
import CardSkeleton from "../../common/cardskeleton";
import Productcard from "../../common/productcard";
// import Paginate from "@/components/pagination/Paginate";
// import { useRouter } from "next/router";
import { GetRequest, GetRequests } from "@/utils/requests";
import InfiniteScroll from "react-infinite-scroll-component";

//

const AllProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await GetRequest("/product?page=1&pageSize=10");
      if (res?.status === 200) {
        setProducts(res?.data?.products);
        setTotalCount(res?.data?.totalCount);
        setHasMore(res?.data?.products.length < res?.data?.totalCount);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const fetchProducts = async (newPage: number) => {
    const token = localStorage.getItem("token") || "";
    const res = await GetRequests(
      `/product/admin?page=${newPage}&pageSize=10`,
      token
    );

    if (res?.status === 200) {
      // Append the new products to the existing products
      setProducts((prevProducts) => [
        ...prevProducts,
        ...(res?.data?.products || []),
      ]);
      setHasMore(products.length + res?.data?.products.length < totalCount);
      setPage(newPage);
    } else {
      setHasMore(false);
    }
  };

  const fetchMoreData = () => {
    if (hasMore) {
      fetchProducts(page + 1);
    }
  };

  //

  return (
    <Layout>
      <div className="all-products">
        <div
          className="container"
          id="scrollableDiv"
          style={{ height: "90vh", overflow: "auto" }}
        >
          <div className="heading-section">
            <Breadcumb title="All Products" />
          </div>

          {/* <div className="filter">
            <p>Filter</p>
            <FilterIcon />
          </div> */}

          <>
            {loading ? (
              <div className="product-box">
                <CardSkeleton length={12} />
              </div>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={products?.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  loader={
                    products?.length !== 0 && (
                      <p className="my-5 text-xs text-center">
                        Loading more products...
                      </p>
                    )
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="product-box">
                    {products?.map((item: any) => (
                      <Productcard {...item} key={item._id} />
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )}
          </>

          {!loading && products?.length === 0 && (
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
              No Products Available
            </div>
          )}

          {/* pagination */}
          {/* {!loading && products?.length !== 0 && totalCount > PageSize && (
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
          )} */}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
