import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import Topbar from "@/dashboard/components/topbar";
import Productcard from "@/dashboard/common/productcard";
import AddProductModal from "@/dashboard/common/addproduct";
import { GetRequests } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import { filterMethod } from "@/utils/utils";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getProducts = async () => {
      const res = await GetRequests(`/product/admin?page=1&pageSize=10`, token);
      if (res?.status === 200) {
        setProducts(res?.data?.products);
        setTotalCount(res?.data?.totalCount);
        setHasMore(res?.data?.products.length < res?.data?.totalCount);
        dispatch({ type: ACTIONS.LOADING, payload: false });
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getProducts();
  }, [dispatch]);

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

  const filteredData = filterMethod(products, searchInput);

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Products" subtitle="Manage User Orders" />

        <div
          className="orders"
          id="scrollableDiv"
          style={{ height: "90vh", overflow: "auto" }}
        >
          <div className="orders-heading">
            <input
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button onClick={() => setAddProductModal(true)}>
              <i className="bi bi-plus-circle"></i>
              Add Product
            </button>
          </div>

          <>
            {loading || state?.loading ? (
              <div className="order-box">
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
                  <div className="order-box">
                    {filteredData?.map((item: any) => (
                      <Productcard {...item} key={item._id} />
                    ))}
                  </div>
                </InfiniteScroll>
              </>
            )}
          </>

          {!loading && filteredData?.length === 0 && (
            <div className="d-flex justify-content-center text-center mt-5 w-100">
              No products available
            </div>
          )}
        </div>
      </section>

      {addProductModal && (
        <AddProductModal
          createModal={addProductModal}
          setCreateModal={setAddProductModal}
        />
      )}
    </DashboardLayout>
  );
};

export default Products;
