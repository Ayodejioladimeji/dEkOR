// import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { DeleteFavourite } from "../../../public/assets";
import { firstTwoWords } from "@/utils/utils";
import ConfirmModal from "./confirmmodal";
import { useRouter } from "next/router";
import Image from "next/image";
import { DeleteRequest } from "@/utils/requests";
import cogoToast from "cogo-toast";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import EditCategoryModal from "./editcategorymodal";

//

const Categorycard = (props: any) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteloading, setDeleteloading] = useState(false);
  const router = useRouter();
  const {state, dispatch} = useContext(DataContext)
  const [editCategoryModal, setEditCategoryModal] = useState(false);

  // handle delete
  const handleDelete = async () => {
    const token = localStorage.getItem("token") || ""

    setDeleteloading(true)

    const res = await DeleteRequest(`/category/${props?._id}`, token)
    if(res?.status === 200){
      dispatch({type:ACTIONS.CALLBACK, payload:!state?.callback})
      cogoToast.success(res?.data?.message)
      setDeleteloading(false);
      setDeleteModal(false)
    }
  };

  //
  
  return (
    <>
      <div className="order-card">
        <div className="order-image">
          <Image
            src={props?.image}
            alt="product-image"
            width={100}
            height={100}
            unoptimized
          />

          <div className="item-cart" onClick={() => setDeleteModal(true)}>
            <DeleteFavourite />
          </div>

          <button
            onClick={() =>
              setEditCategoryModal(true)
            }
            className="add-to-cart"
          >
            Edit Category
          </button>
        </div>

        <div className="order-content">
          <h3>{firstTwoWords(props?.name)}</h3>
        </div>
      </div>

      {deleteModal && (
        <ConfirmModal
          title="Remove Category"
          subtitle="Are you sure you want to remove this category?"
          buttonTitle="Remove"
          buttonColor="red"
          onSubmit={handleDelete}
          loading={deleteloading}
          setConfirmModal={setDeleteModal}
          confirmModal={deleteModal}
        />
      )}

      {/* update category modal */}
      {editCategoryModal && (
        <EditCategoryModal
          editModal={editCategoryModal}
          setEditModal={setEditCategoryModal}
          data={props}
        />
      )}
    </>
  );
};

export default Categorycard;
