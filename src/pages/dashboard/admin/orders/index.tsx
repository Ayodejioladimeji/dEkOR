import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import Topbar from "@/dashboard/components/topbar";
import { GetRequests } from "@/utils/requests";
import MainOrdercard from "@/dashboard/common/mainordercard";
import Paginate from "@/components/pagination/Paginate";
import { useRouter } from "next/router";

/* eslint-disable */

const Orders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 20;
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getOrders = async () => {
      const res = await GetRequests(
        `/orders/admin?page=${page === undefined ? currentPage : page}&pageSize=${PageSize}`,
        token
      );
      if (res?.status === 200) {
        setOrders(res?.data?.data);
        setTotalCount(res?.data?.totalCount);

        if (page === undefined) {
          setCurrentPage(1);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getOrders();
  }, [page]);

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

          {/* pagination */}
          {!loading && orders?.length !== 0 && totalCount > PageSize && (
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
    </DashboardLayout>
  );
};

export default Orders;
