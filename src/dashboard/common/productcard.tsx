import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
// import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { DeleteFavourite } from "../../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";

//

const Productcard = (props: any) => {
  const { state, dispatch } = useContext<any>(DataContext);

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
          <DeleteFavourite />
        </div>

        <button onClick={addToCart} className="add-to-cart">
          Edit Product
        </button>
      </div>

      <div className="order-content">
        <h3>{firstTwoWords(props?.title)}</h3>
        <p>${formatMoney(Number(props?.price))}</p>
      </div>
    </div>
  );
};

export default Productcard;
