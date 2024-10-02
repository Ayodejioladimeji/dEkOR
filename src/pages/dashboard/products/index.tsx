import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Productcard from "@/dashboard/common/productcard";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    setOrders(data);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Products" subtitle="Manage User Orders" />

        <div className="orders">
          <div className="orders-heading">
            <input type="text" placeholder="Search" />

            <button>
              <i className="bi bi-plus-circle"></i>
              Add Product
            </button>
          </div>

          <div className="order-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {orders?.map((item: any) => {
                  return <Productcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Products;
