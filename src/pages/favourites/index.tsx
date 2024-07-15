import React, { useContext, useEffect, useState } from "react";
import Paginate from "@/components/pagination/Paginate";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";
import Layout from "@/components/Layout";
import Breadcumb from "@/common/breadcumb";
import { FilterIcon } from "../../../public/assets";
import CardSkeleton from "@/common/cardskeleton";
import Favouritecard from "@/common/favouritecard";
import Image from "next/image";

//

const Favourites = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const PageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { page } = router.query;
  const { state } = useContext(DataContext);

  //get all products on products page
  useEffect(() => {
    if (router.isReady) {
      const getProducts = async () => {
        setProducts(state?.favourite);
        setTotalCount(state?.favourite?.length);

        setLoading(false);
      };
      getProducts();
    }
  }, [currentPage, page, router, state?.favourite]);

  // get current product
  const currentProducts = products?.slice(
    (currentPage - 1) * PageSize,
    currentPage * PageSize
  );

  //

  return (
    <Layout>
      <div className="all-products">
        <div className="container">
          {!state?.loading && state?.favourite?.length === 0 ? (
            <div className="main-favourite-empty">
              <div className="favourite-empty">
                <div className="image-box">
                  <Image
                    src="/images/empty-cart.png"
                    alt=""
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>

                <h3>Your favourite is empty</h3>
                <button
                  onClick={() => router.push("/product")}
                  className="start-shopping"
                >
                  Add Favourite
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="heading-section">
                <Breadcumb title="All Favourites" />
              </div>

              <div className="filter">
                <p>Filter</p>
                <FilterIcon />
              </div>

              <div className="product-box">
                {loading || state?.loading ? (
                  <CardSkeleton length={8} />
                ) : (
                  <>
                    {currentProducts?.map((item: any) => {
                      return <Favouritecard {...item} key={item.id} />;
                    })}
                  </>
                )}
              </div>
            </>
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

export default Favourites;
