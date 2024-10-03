import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
// import { useRouter } from "next/router";
import CategoryModal from "@/dashboard/common/categorymodal";
import Categorycard from "@/dashboard/common/categorycard";
import { GetRequests } from "@/utils/requests";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  // const router = useRouter();
  const [categoryModal, setCategoryModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token") || ""

    const fetchCategories = async() => {
      const res = await GetRequests("/category", token)
      console.log(res?.data)
      setCategories(res?.data)
      setLoading(false);
    }

    fetchCategories()
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
                {categories?.map((item: any) => {
                  return <Categorycard {...item} key={item.id} />;
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
