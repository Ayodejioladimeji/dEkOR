import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import Paymentcard from "@/dashboard/common/paymentcard";
import { paymentdata } from "@/constants/paymentdata";
import PaymentSkeleton from "@/common/paymentskeleton";

const Payments = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<any>([]);

  useEffect(() => {
    setPayments(paymentdata);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Payments made" subtitle="View your payments here" />

        <div className="payments">
          <div className="payment-box">
            {loading ? (
              <PaymentSkeleton length={8} />
            ) : (
              <>
                {payments?.map((item: any) => {
                  return <Paymentcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Payments;
