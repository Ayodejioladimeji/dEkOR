import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import Ordercard from "@/dashboard/common/orderscard";
import Topbar from "@/dashboard/components/topbar";
import { GetRequests } from "@/utils/requests";
import { useRouter } from "next/router";

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getOrders = async () => {
      const res = await GetRequests("/orders", token);
      if (res?.status === 200 || res?.status === 201) {
        const result = res?.data?.data?.find((item: any) => item._id === slug);
        setOrders(result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getOrders();
  }, [slug]);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="User Order" subtitle="View user orders here" />

        <div className="orders">
          <div className="order-box">
            {loading ? (
              <CardSkeleton length={6} />
            ) : (
              <>
                {orders?.products?.map((item: any) => {
                  return <Ordercard {...item} key={item._id} />;
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
