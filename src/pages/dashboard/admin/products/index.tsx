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

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [addProductModal, setAddProductModal] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getProducts = async () => {
      const res = await GetRequests("/product/admin", token);
      if (res?.status === 200) {
        setProducts(res?.data);
        dispatch({ type: ACTIONS.LOADING, payload: false });
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getProducts();
  }, [dispatch, state?.callback]);

  const filteredData = filterMethod(products, searchInput);

  //

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
              <CardSkeleton length={12} />
            ) : (
              <>
                {filteredData?.map((item: any) => {
                  return <Productcard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && filteredData?.length === 0 && (
            <div className="d-flex justify-content-center text-center mt-5 w-100">
              No product available
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
