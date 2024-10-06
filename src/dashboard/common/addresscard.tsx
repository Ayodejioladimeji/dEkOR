import React, { useContext, useState } from "react";
import ConfirmModal from "./confirmmodal";
import AddressModal from "./addressModal";
import { DeleteRequest, PatchRequest } from "@/utils/requests";
import cogoToast from "cogo-toast";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
//

interface Props {
  _id: string;
  name: string;
  address: string;
  region: string;
  city: any;
  phone: string;
  isDefault: boolean;
}

const AddressCard = (props: Props) => {
  const [confirm, setConfirm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteloading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { state, dispatch } = useContext(DataContext);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") || "";

    setLoading(true);
    const res = await PatchRequest(`/address-book/${props?._id}`, "", token);
    if (res?.status === 200 || res?.status === 201) {
      dispatch({
        type: ACTIONS.CALLBACK,
        payload: !state.callback,
      });
      cogoToast.success(res?.data?.message);
      setConfirm(false);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token") || "";

    setDeleteloading(true);

    const res = await DeleteRequest(`/address-book/${props?._id}`, token);
    if (res?.status === 200 || res?.status === 201) {
      dispatch({
        type: ACTIONS.CALLBACK,
        payload: !state.callback,
      });
      cogoToast.success(res?.data?.message);
      setDeleteloading(false);
      setDeleteModal(false);
    } else {
      setDeleteloading(false);
    }
  };

  //

  return (
    <>
      <div className="address-card">
        <div onClick={() => setConfirm(true)}>
          <h3>{props?.name}</h3>
          <p>{props?.address}</p>
          <p>{props?.region}</p>
          <p>{props?.city?.value}</p>
          <p>{props?.phone}</p>

          {props?.isDefault && <i className="bi bi-check-circle-fill"></i>}
        </div>

        <hr />
        <div className="address-below">
          <i className="bi bi-trash3" onClick={() => setDeleteModal(true)}></i>
          <i
            className="bi bi-pencil-square"
            onClick={() => setEditModal(true)}
          ></i>
        </div>
      </div>

      {confirm && (
        <ConfirmModal
          title="Default Address"
          subtitle="Are you sure you want to set this address as your default address?"
          buttonTitle="Save"
          buttonColor="#27493e"
          onSubmit={handleSubmit}
          loading={loading}
          setConfirmModal={setConfirm}
          confirmModal={confirm}
        />
      )}

      {deleteModal && (
        <ConfirmModal
          title="Remove Address"
          subtitle="Are you sure you want to remove this address?"
          buttonTitle="Delete"
          buttonColor="red"
          onSubmit={handleDelete}
          loading={deleteloading}
          setConfirmModal={setDeleteModal}
          confirmModal={deleteModal}
        />
      )}

      {editModal && (
        <AddressModal
          editModal={editModal}
          setEditModal={setEditModal}
          addressData={props}
        />
      )}
    </>
  );
};

export default AddressCard;
