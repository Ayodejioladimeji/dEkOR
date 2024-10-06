import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import PaymentSkeleton from "@/common/paymentskeleton";
import AddressCard from "@/dashboard/common/addresscard";
import CreateAddressModal from "@/dashboard/common/createAddress";
import { GetRequests } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";

const AddressBook = () => {
  const [addresses, setAddresses] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [createModal, setCreateModal] = useState(false);
  const { state } = useContext(DataContext);

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
  }, [state?.callback]);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Address Book" subtitle="Manage your addresses here" />

        <div className="addresses">
          {!loading && addresses?.length !== 0 && (
            <div className="d-flex justify-content-end mb-5">
              <button className="add-new" onClick={() => setCreateModal(true)}>
                <i className="bi bi-plus-lg"></i>
                Add new
              </button>
            </div>
          )}

          <div className="address-box">
            {loading ? (
              <PaymentSkeleton length={4} />
            ) : (
              <>
                {addresses?.map((item: any) => {
                  return <AddressCard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && addresses?.length === 0 && (
            <div
              style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <i className="bi bi-map" style={{ fontSize: "45px" }}></i>
              No Address Available
              <small className="mt-3" onClick={() => setCreateModal(true)}>
                Click here to add new address
              </small>
            </div>
          )}
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

export default AddressBook;
