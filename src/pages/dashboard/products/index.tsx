import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Productcard from "@/dashboard/common/productcard";
// import { useRouter } from "next/router";
import AddProductModal from "@/dashboard/common/addproduct";
import { GetRequest } from "@/utils/requests";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any>([]);
  const [addProductModal, setAddProductModal] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await GetRequest("/product")
      if(res?.status === 200){
        setProducts(res?.data)
        setLoading(false);
      }
      else{
        setLoading(false)
      }
    }

    getProducts()

  }, []);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Products" subtitle="Manage User Orders" />

        <div className="orders">
          <div className="orders-heading">
            <input type="text" placeholder="Search" />

            <button onClick={() => setAddProductModal(true)}>
              <i className="bi bi-plus-circle"></i>
              Add Product
            </button>
          </div>

          <div className="order-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {products?.map((item: any) => {
                  return <Productcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>

          {!loading && products?.length === 0 && <div className="d-flex justify-content-center text-center mt-5 w-100">No product available</div>}

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
