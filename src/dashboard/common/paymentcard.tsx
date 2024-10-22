import React from "react";
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
        <p className="response"> {props?.authorization?.bank}</p>
      </div>

      <div className="card-details">
        <p>Ref Number</p>
        <p className="response">{props?.reference}</p>
      </div>

      <div className="card-details">
        <p>Payment Status</p>
        <p className="response" style={{ color: "green" }}>
          {/* <CheckIcon /> */}
          {props?.status}
        </p>
      </div>

      <div className="card-details">
        <p>Payment Time</p>
        <p className="response">{moment(props?.paidAt).format("lll")}</p>
      </div>

      <div className="card-details">
        <p>Payment Method</p>
        <p className="response">{props?.channel}</p>
      </div>

      <hr />

      <div className="card-details">
        <h2 className="p-0">Amount Paid</h2>
        <h2 className="p-0">₦{formatMoney(props?.amount)}</h2>
      </div>
    </div>
  );
};

export default Paymentcard;
