import React, { useEffect, useState } from "react";
import Breadcumb from "../../../common/breadcumb";
import Layout from "../../../components/Layout";
import CardSkeleton from "../../../common/cardskeleton";
import Productcard from "../../../common/productcard";
import { GetRequest } from "@/utils/requests";
import Paginate from "@/components/pagination/Paginate";
import { useRouter } from "next/router";

/* eslint-disable */

//

const CategoryProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 20;
  const router = useRouter();
  const { slug, page } = router.query;

  //

  useEffect(() => {
    if (slug) {
      const getProducts = async () => {
        const res = await GetRequest(
          `/product?categoryId=${slug}&page=${page === undefined ? currentPage : page}&pageSize=${PageSize}`
        );
        if (res?.status === 200) {
          setProducts(res?.data?.data);
          setTotalCount(res?.data?.totalCount);

          if (page === undefined) {
            setCurrentPage(1);
          }

          setLoading(false);
        } else {
          setLoading(false);
        }
      };

      getProducts();
    }
  }, [page, slug]);

  //

  return (
    <Layout>
      <div className="all-products">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="All Products" route="categories" />
          </div>

          <div className="product-box">
            {loading ? (
              <CardSkeleton length={10} />
            ) : (
              <>
                {products?.map((item: any) => (
                  <Productcard {...item} key={item._id} />
                ))}
              </>
            )}
          </div>

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
          {!loading && products?.length !== 0 && totalCount > PageSize && (
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

export default CategoryProducts;
