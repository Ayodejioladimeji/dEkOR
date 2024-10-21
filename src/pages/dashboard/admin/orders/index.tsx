import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import Topbar from "@/dashboard/components/topbar";
import { GetRequests } from "@/utils/requests";
import MainOrdercard from "@/dashboard/common/mainordercard";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getOrders = async () => {
      const res = await GetRequests("/orders/admin?page=1&pageSize=10", token);
      if (res?.status === 200) {
        setOrders(res?.data?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getOrders();
  }, []);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Your Orders" subtitle="View your orders here" />

        <div className="orders">
          <div className="order-box">
            {loading ? (
              <CardSkeleton length={6} />
            ) : (
              <>
                {orders?.map((item: any) => {
                  return <MainOrdercard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && orders?.length === 0 && (
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
              You have no orders available
            </div>
          )}
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Orders;