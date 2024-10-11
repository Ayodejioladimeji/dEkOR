import React from "react";
import { CheckIcon } from "../../../public/assets";
import moment from "moment";
import { formatMoney } from "@/utils/utils";
//

const Paymentcard = (props: any) => {
  //
  return (
    <div className="payment-card">
      <h3>Payment Details</h3>

      <hr />

      <div className="card-details">
        <p>Bank Name</p>
        <p>{props?.authorization?.bank}</p>
      </div>

      <div className="card-details">
        <p>Ref Number</p>
        <p>{props?.reference}</p>
      </div>

      <div className="card-details">
        <p>Payment Status</p>
        <p style={{ color: "green" }}>
          <CheckIcon />
          {props?.status}
        </p>
      </div>

      <div className="card-details">
        <p>Payment Time</p>
        <p>{moment(props?.paidAt).format("lll")}</p>
      </div>

      <div className="card-details">
        <p>Payment Method</p>
        <p>{props?.channel}</p>
      </div>

      <hr />

      <div className="card-details">
        <h2>Amount Paid</h2>
        <h2>{formatMoney(props?.amount)}</h2>
      </div>
    </div>
  );
};

export default Paymentcard;
