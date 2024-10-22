import React, { useContext, useEffect, useState } from "react";
import CardSkeleton from "@/common/cardskeleton";
import { GetRequests } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import Layout from "@/components/Layout";
import Breadcumb from "@/common/breadcumb";
import Categorycard from "@/common/categorycard";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<any>([]);
  const { state, dispatch } = useContext(DataContext);

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

  //

  return (
    <Layout>
      <div className="all-categories">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="All Categories" />
          </div>

          <div className="category-box">
            {loading ? (
              <CardSkeleton length={12} />
            ) : (
              <>
                {categories?.map((item: any) => {
                  return <Categorycard {...item} key={item._id} />;
                })}
              </>
            )}
          </div>

          {!loading && categories?.length === 0 && (
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
              No Category Available
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
