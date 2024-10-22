import React from "react";
import { Image } from "react-bootstrap";
import { formatMoney } from "@/utils/utils";
import { useRouter } from "next/router";
import moment from "moment";

//

const MainOrdercard = (props: any) => {
  const router = useRouter();

  const handleRoute = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.role === "user") {
      router.push(`/dashboard/orders/${props._id}`);
    } else {
      router.push(`/dashboard/admin/orders/${props._id}`);
    }
  };

  //
  return (
    <div className="order-card" onClick={handleRoute}>
      <div className="order-image">
        <Image
          src="/images/boxes-shopping.png"
          alt="product-image"
          width={100}
          height={100}
        />

        <button
          className={`add-to-cart order-cart ${props?.paymentStatus === "pending" ? "orange" : "green"}`}
        >
          {props?.paymentStatus === "pending"
            ? "Pending Payment"
            : "Payment Successful"}
        </button>
      </div>

      <div className="order-content px-1">
        <p className="date">{moment(props?.updatedAt).format("lll")}</p>
        <p>₦{formatMoney(Number(props?.totalAmount))}</p>
      </div>
    </div>
  );
};

export default MainOrdercard;
