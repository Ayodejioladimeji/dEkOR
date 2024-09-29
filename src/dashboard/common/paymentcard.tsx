import React from "react";
//

interface Props {
  id: string;
  name: string;
  order: string;
  amount: string;
  createdAt: string;
}

const Paymentcard = (props: Props) => {
  //
  return (
    <div className="payment-card">
      <h3>{props?.name}</h3>
      <h3>{props?.order}</h3>
      <h2>₦{props?.amount}</h2>
      <i className="bi bi-credit-card-2-back-fill"></i>
      <hr />
      <p>{props?.createdAt}</p>
    </div>
  );
};

export default Paymentcard;
