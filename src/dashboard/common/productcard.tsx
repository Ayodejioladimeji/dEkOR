// import { useRouter } from "next/router";
import React, { useState } from "react";
import { Image } from "react-bootstrap";
import { DeleteFavourite } from "../../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";
import ConfirmModal from "./confirmmodal";
import { useRouter } from "next/router";

//

const Productcard = (props: any) => {
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
            src={props?.images[0]}
            alt="product-image"
            width={100}
            height={100}
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
            Edit Product
          </button>
        </div>

        <div className="order-content">
          <h3>{firstTwoWords(props?.title)}</h3>
          <p>${formatMoney(Number(props?.price))}</p>
        </div>
      </div>

      {deleteModal && (
        <ConfirmModal
          title="Remove Product"
          subtitle="Are you sure you want to remove this product?"
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

export default Productcard;
