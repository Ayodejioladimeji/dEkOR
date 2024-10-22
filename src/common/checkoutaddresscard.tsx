import React, { useContext } from "react";
import { PatchRequest } from "@/utils/requests";
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

const CheckoutAddressCard = (props: Props) => {
  const { state, dispatch } = useContext(DataContext);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token") || "";

    const res = await PatchRequest(`/address-book/${props?._id}`, "", token);
    if (res?.status === 200 || res?.status === 201) {
      dispatch({
        type: ACTIONS.CALLBACK,
        payload: !state.callback,
      });
      cogoToast.success(res?.data?.message);
    }
  };

  //

  return (
    <>
      <div className="checkout-address-card">
        <div onClick={handleSubmit}>
          <h3>{props?.name}</h3>
          <p>{props?.address}</p>
          <p>{props?.region}</p>
          <p>{props?.city?.value}</p>
          <p>{props?.phone}</p>

          {props?.isDefault && <i className="bi bi-check-circle-fill"></i>}
        </div>
      </div>
    </>
  );
};

export default CheckoutAddressCard;
