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
import { useRouter } from "next/router";
import Paginate from "@/components/pagination/Paginate";

/* eslint-disable */

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 15;
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getProducts = async () => {
      const res = await GetRequests(
        `/product/admin?page=${page === undefined ? currentPage : page}&pageSize=${PageSize}`,
        token
      );
      if (res?.status === 200) {
        setProducts(res?.data?.products);
        dispatch({ type: ACTIONS.LOADING, payload: false });

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
  }, [dispatch, page, state?.callback]);

  const filteredData = filterMethod(products, searchInput);

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Products" subtitle="Manage User Orders" />

        <div className="orders">
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

          <div className="order-box">
            {loading || state?.loading ? (
              <CardSkeleton length={9} />
            ) : (
              <>
                {filteredData?.map((item: any) => (
                  <Productcard {...item} key={item._id} />
                ))}
              </>
            )}
          </div>

          {!loading && filteredData?.length === 0 && (
            <div className="d-flex justify-content-center text-center mt-5 w-100">
              No products available
            </div>
          )}

          {/* pagination */}
          {!loading && filteredData?.length !== 0 && totalCount > PageSize && (
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
