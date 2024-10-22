import React, { useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import Paymentcard from "@/dashboard/common/paymentcard";
import PaymentSkeleton from "@/common/paymentskeleton";
import { GetRequests } from "@/utils/requests";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getPayments = async () => {
      const res = await GetRequests("/transactions/admin", token);
      if (res?.status === 200) {
        setPayments(res?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getPayments();
  }, []);
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
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Payments;
