import React, { useState } from "react";
import ConfirmModal from "./confirmmodal";
import AddressModal from "./addressModal";
//

interface Props {
  id: string;
  name: string;
  address: string;
  region: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

const AddressCard = (props: Props) => {
  const [confirm, setConfirm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteloading, setDeleteloading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  const handleDelete = () => {
    setDeleteloading(true);
    setDeleteloading(false);
  };

  //

  return (
    <>
      <div className="address-card">
        <div onClick={() => setConfirm(true)}>
          <h3>{props?.name}</h3>
          <p>{props?.address}</p>
          <p>{props?.region}</p>
          <p>{props?.city}</p>
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
          addresses={props}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
    </>
  );
};

export default AddressCard;
