import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Productcard from "@/dashboard/common/productcard";
// import { useRouter } from "next/router";
import CategoryModal from "@/dashboard/common/categorymodal";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);
  // const router = useRouter();
  const [categoryModal, setCategoryModal] = useState(false);

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
        <Topbar title="Categories" subtitle="Manage Categories here" />

        <div className="orders">
          <div className="orders-heading">
            <input type="text" placeholder="Search category" />

            <button onClick={() => setCategoryModal(true)}>
              <i className="bi bi-plus-circle"></i>
              Add Category
            </button>
          </div>

          <div className="order-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {orders?.map((item: any) => {
                  return <Productcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </section>

      {categoryModal && (
        <CategoryModal
          createModal={categoryModal}
          setCreateModal={setCategoryModal}
        />
      )}
    </DashboardLayout>
  );
};

export default Categories;
