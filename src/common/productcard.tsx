import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { Favourite, ItemCart } from "../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";

//

const Productcard = (props: any) => {
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

  const addFavourite = () => {
    // check if items is already added
    const check = state?.favourite.every((item) => {
      return item.id !== props?.id;
    });

    if (check) {
      const data = {
        ...props,
        quantity: 1,
      };

      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.FAVOURITE, payload: data });
      cogoToast.success("Item added to your favourite");
    } else {
      cogoToast.error("Item already added to your favourite");
    }
  };

  //
  return (
    <div className="main-product-card">
      <div className="product-image">
        <Image
          src={
            props?.images?.length === 0
              ? "/images/placehoder.jpg"
              : props?.images[0]
          }
          alt="product-image"
          width={100}
          height={100}
        />

        <div className="favourite" onClick={addFavourite}>
          <Favourite />
        </div>

        <div className="item-cart" onClick={addToCart}>
          <ItemCart />
        </div>

        <button onClick={addToCart} className="add-to-cart">
          Add to cart
        </button>
      </div>

      <div className="product-content">
        <h3>{firstTwoWords(props?.title)}</h3>
        <p>${formatMoney(Number(props?.sellingPrice))}</p>
        <button onClick={() => router.push(`/product/${props?._id}`)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Productcard;
