import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import Paymentcard from "@/dashboard/common/paymentcard";
import PaymentSkeleton from "@/common/paymentskeleton";
import { GetRequests } from "@/utils/requests";
import Paginate from "@/components/pagination/Paginate";
import { useRouter } from "next/router";

/* eslint-disable */

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const PageSize = 9;
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getPayments = async () => {
      const res = await GetRequests(
        `/transactions/admin?page=${page === undefined ? currentPage : page}&pageSize=${PageSize}`,
        token
      );
      if (res?.status === 200) {
        setPayments(res?.data?.data);
        setTotalCount(res?.data?.totalCount);

        if (page === undefined) {
          setCurrentPage(1);
        }

        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getPayments();
  }, [page]);
  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Payments made" subtitle="View your payments here" />

        <div className="payments">
          <div className="payment-box">
            {loading ? (
              <PaymentSkeleton length={4} />
            ) : (
              <>
                {payments?.map((item: any) => {
                  return <Paymentcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>

          {!loading && payments?.length === 0 && (
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
                className="bi bi-credit-card-2-back"
                style={{ fontSize: "45px" }}
              ></i>
              You have no payments available
            </div>
          )}

          {/* pagination */}
          {!loading && payments?.length !== 0 && totalCount > PageSize && (
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

export default Payments;
