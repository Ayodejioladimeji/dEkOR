import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { ItemCart } from "../../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";
import { useRouter } from "next/router";

//

const Ordercard = (props: any) => {
  const { state, dispatch } = useContext<any>(DataContext);
  const router = useRouter();
  const { slug } = router.query;

  // add items to cart
  const addToCart = () => {
    // check if items is already added
    const check = state?.cart.every((item) => {
      return item.id !== props?.id;
    });

    if (check) {
      const cartData = {
        ...props,
        quantity: 1,
      };

      cogoToast.success("Item added to your cart");
      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.CART, payload: cartData });
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  const handleRoute = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.role === "user") {
      router.push(`/dashboard/orders/${slug}/${props._id}`);
    } else {
      router.push(`/dashboard/admin/orders/${slug}/${props._id}`);
    }
  };

  //
  return (
    <div className="order-card">
      <div className="order-image">
        <Image
          src={props?.images[0]}
          alt="product-image"
          width={100}
          height={100}
        />

        <div className="item-cart" onClick={addToCart}>
          <ItemCart />
        </div>

        <button
          onClick={handleRoute}
          className={`add-to-cart ${props?.paymentStatus === "pending" ? "orange" : "green"}`}
        >
          {props?.paymentStatus === "pending"
            ? "Pending Payment"
            : "Payment Successful"}
        </button>
      </div>

      <div className="order-content" onClick={handleRoute}>
        <h3>{firstTwoWords(props?.title)}</h3>
        <p>₦{formatMoney(Number(props?.sellingPrice))}</p>
      </div>

      <div
        className={`${props?.orderStatus === "delivered" ? "delivery-status" : "pending-status"}`}
      >
        {props?.orderStatus}
      </div>
    </div>
  );
};

export default Ordercard;
