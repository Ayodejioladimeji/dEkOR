import React, { useState } from "react";
import ConfirmModal from "./confirmmodal";
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
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
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
          <i className="bi bi-trash3"></i>
          <i className="bi bi-pencil-square"></i>
        </div>
      </div>

      {confirm && (
        <ConfirmModal
          title="Default Address"
          subtitle="Are you sure you want to set this address to your default address?"
          buttonTitle="Save"
          buttonColor="#27493e"
          onSubmit={handleSubmit}
          loading={loading}
          setConfirmModal={setConfirm}
          confirmModal={confirm}
        />
      )}
    </>
  );
};

export default AddressCard;
