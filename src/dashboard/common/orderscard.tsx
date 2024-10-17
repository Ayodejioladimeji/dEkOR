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

  const handleRoute = (item: any) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user?.role === "user") {
      router.push(`/dashboard/orders/${props._id}?productId=${item._id}`);
    } else {
      router.push(`/dashboard/admin/orders/${props._id}?productId=${item._id}`);
    }
  };

  //
  return (
    <>
      {props?.products?.map((item: any, index: number) => {
        return (
          <div className="order-card" key={index}>
            <div className="order-image">
              <Image
                src={item?.images[0]}
                alt="product-image"
                width={100}
                height={100}
              />

              <div className="item-cart" onClick={addToCart}>
                <ItemCart />
              </div>

              <button
                onClick={() => handleRoute(item)}
                className={`add-to-cart ${props?.paymentStatus === "pending" ? "orange" : "green"}`}
              >
                {props?.paymentStatus === "pending"
                  ? "Pending Payment"
                  : "Payment Successful"}
              </button>
            </div>

            <div className="order-content" onClick={() => handleRoute(item)}>
              <h3>{firstTwoWords(item?.title)}</h3>
              <p>₦{formatMoney(Number(item?.sellingPrice))}</p>
            </div>

            <div
              className={`${item?.orderStatus === "delivered" ? "delivery-status" : "pending-status"}`}
            >
              {item?.orderStatus}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Ordercard;
