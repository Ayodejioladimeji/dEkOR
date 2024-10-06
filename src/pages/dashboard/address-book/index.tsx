import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import PaymentSkeleton from "@/common/paymentskeleton";
import AddressCard from "@/dashboard/common/addresscard";
import CreateAddressModal from "@/dashboard/common/createAddress";
import { GetRequests } from "@/utils/requests";

const Overview = () => {
  const [addresses, setAddresses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);

  //
  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getAddress = async () => {
      const res = await GetRequests("/address-book", token);
      if (res?.status === 200 || res?.status === 201) {
        setAddresses(res?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getAddress();
  }, []);
  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Address Book" subtitle="Manage your addresses here" />

        <div className="addresses">
          <small onClick={() => setCreateModal(true)}>
            Click here to add new address
          </small>

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

        {createModal && (
          <CreateAddressModal
            createModal={createModal}
            setCreateModal={setCreateModal}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default Overview;
