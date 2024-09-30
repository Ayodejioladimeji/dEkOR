import React from "react";
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
  //
  return (
    <div className="address-card">
      <div>
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
  );
};

export default AddressCard;
