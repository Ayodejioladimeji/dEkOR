import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../DashboardLayout";
import CardSkeleton from "@/common/cardskeleton";
import Topbar from "@/dashboard/components/topbar";
import CategoryModal from "@/dashboard/common/categorymodal";
import Categorycard from "@/dashboard/common/categorycard";
import { GetRequests } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import { filterMethod } from "@/utils/utils";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const [categoryModal, setCategoryModal] = useState(false);
  const { state, dispatch } = useContext(DataContext);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const fetchCategories = async () => {
      const res = await GetRequests("/category", token);

      if (res?.status === 200 || res?.status === 201) {
        setCategories(res?.data?.data);
        dispatch({ type: ACTIONS.LOADING, payload: false });
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch, state?.callback]);

  const filteredData = filterMethod(categories, searchInput);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Categories" subtitle="Manage Categories here" />

        <div className="orders">
          <div className="orders-heading">
            <input
              type="text"
              placeholder="Search category"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <button onClick={() => setCategoryModal(true)}>
              <i className="bi bi-plus-circle"></i>
              Add Category
            </button>
          </div>

          <div className="order-box">
            {loading || state?.loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {filteredData?.map((item: any) => {
                  return <Categorycard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && filteredData?.length === 0 && (
            <div className="d-flex justify-content-center text-center mt-5 w-100">
              No categories available
            </div>
          )}
        </div>
      </section>

      {/* create category modal */}
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
