import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import PaymentSkeleton from "@/common/paymentskeleton";
import AddressCard from "@/dashboard/common/addresscard";
import { address } from "@/constants/address";

const Overview = () => {
  const [addresses, setAddresses] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAddresses(address);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Address Book" subtitle="Manage your addresses here" />

        <div className="addresses">
          <div className="address-box">
            {loading ? (
              <PaymentSkeleton length={4} />
            ) : (
              <>
                {addresses?.map((item: any) => {
                  return <AddressCard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Overview;
