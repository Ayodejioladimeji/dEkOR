import React, { useContext, useState } from "react";
import {
  DeleteFavourite,
  EyeClosedIcon,
  EyeOpenIcon,
} from "../../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";
import ConfirmModal from "./confirmmodal";
import { useRouter } from "next/router";
import Image from "next/image";
import { DeleteRequest, PatchRequest } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
import cogoToast from "cogo-toast";

//

const Productcard = (props: any) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [activateModal, setActivateModal] = useState(false);
  const [deleteloading, setDeleteloading] = useState(false);
  const [activateloading, setActivateloading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);

  // handle delete
  const handleActivate = async () => {
    setActivateloading(true);

    const token = localStorage.getItem("token") || "";

    const res = await PatchRequest(`/product/admin/${props?._id}`, {}, token);
    if (res?.status === 200) {
      dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
      setActivateModal(false);
      setActivateloading(false);
      cogoToast.success(res?.data?.message);
    } else {
      setActivateloading(false);
    }
  };

  // handle delete
  const handleDelete = async () => {
    setDeleteloading(true);

    const token = localStorage.getItem("token") || "";

    const res = await DeleteRequest(`/product/${props?._id}`, token);
    if (res?.status === 200) {
      dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
      setDeleteModal(false);
      setDeleteloading(false);
    } else {
      setDeleteloading(false);
    }
  };

  //
  return (
    <>
      <div className="order-card">
        <div className="order-image">
          <Image
            src={
              props?.images?.length === 0
                ? "/images/placehoder.jpg"
                : props?.images[0]
            }
            alt="product-image"
            width={100}
            height={100}
            unoptimized
          />

          <div className="active-eye" onClick={() => setActivateModal(true)}>
            {props?.isActive ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </div>
          {/* <EyeClosedIcon /> */}

          <div className="item-cart" onClick={() => setDeleteModal(true)}>
            <DeleteFavourite />
          </div>

          <button
            onClick={() =>
              router.push(
                `/dashboard/admin/products/edit-product/${props?._id}`
              )
            }
            className="add-to-cart"
          >
            Edit Product
          </button>
        </div>

        <div className="order-content">
          <h3>{firstTwoWords(props?.title)}</h3>
          <p>₦{formatMoney(Number(props?.sellingPrice))}</p>
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

      {activateModal && (
        <ConfirmModal
          title={props?.isActive ? "De-activate Product" : "Activate Product"}
          subtitle={
            props?.isActive
              ? "Are you sure you want to de-activate this product? it will not be visible to users"
              : "Are you sure you want to activate this product? it will be visible to users"
          }
          buttonTitle="Continue"
          buttonColor={props?.isActive ? "red" : "#27493e"}
          onSubmit={handleActivate}
          loading={activateloading}
          setConfirmModal={setActivateModal}
          confirmModal={activateModal}
        />
      )}
    </>
  );
};

export default Productcard;
