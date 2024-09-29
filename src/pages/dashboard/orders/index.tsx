import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import { data } from "@/constants/data";
import Ordercard from "@/dashboard/common/orderscard";
import Topbar from "@/dashboard/components/topbar";

const Orders = () => {
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
        <Topbar
          title="Your Orders"
          subtitle="View your orders here, you can also buy again"
        />

        <div className="orders">
          <div className="order-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {orders?.map((item: any) => {
                  return <Ordercard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Orders;
