import React, { useEffect, useState } from "react";
import Breadcumb from "../../common/breadcumb";
import Layout from "../../components/Layout";
import CardSkeleton from "../../common/cardskeleton";
import Productcard from "../../common/productcard";
// import Paginate from "@/components/pagination/Paginate";
// import { useRouter } from "next/router";
import { GetRequest } from "@/utils/requests";

//

const AllProducts = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const res = await GetRequest("/product");
      if (res?.status === 200) {
        setProducts(res?.data?.products);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  //

  return (
    <Layout>
      <div className="all-products">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="All Products" />
          </div>

          {/* <div className="filter">
            <p>Filter</p>
            <FilterIcon />
          </div> */}

          <div className="product-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {products?.map((item: any) => {
                  return <Productcard {...item} key={item._id} />;
                })}
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
