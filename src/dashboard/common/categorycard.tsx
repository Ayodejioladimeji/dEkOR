// import { useRouter } from "next/router";
import React, { useState } from "react";
import { DeleteFavourite } from "../../../public/assets";
import { firstTwoWords } from "@/utils/utils";
import ConfirmModal from "./confirmmodal";
import { useRouter } from "next/router";
import Image from "next/image";

//

const Categorycard = (props: any) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteloading, setDeleteloading] = useState(false);
  const router = useRouter();

  // handle delete
  const handleDelete = () => {
    console.log("submitted");
    setDeleteloading(false);
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
              router.push(`/dashboard/products/edit-product/${props?.id}`)
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
    </>
  );
};

export default Categorycard;
