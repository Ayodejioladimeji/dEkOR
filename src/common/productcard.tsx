import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { Favourite, ItemCart } from "../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";
import { PatchRequest } from "@/utils/requests";

//

const Productcard = (props: any) => {
  const { state, dispatch } = useContext<any>(DataContext);
  const router = useRouter();

  // add items to cart
  const addToCart = async () => {
    // check if items is already added
    const check = state?.cart.every((item) => {
      return item._id !== props?._id;
    });

    if (check) {
      const cartData = {
        ...props,
        quantity: 1,
      };

      // Combine the current cart with the new item

      // Update the state
      cogoToast.success("Item added to your cart");
      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.CART, payload: cartData });

      // Save the updated cart items to the database
      const updatedCart = [...(state?.cart || []), cartData];
      const token = localStorage.getItem("token") || "";
      if (token) {
        const payload = {
          cartItems: updatedCart,
        };

        await PatchRequest("/user/cart", payload, token);
      }
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  const addFavourite = async () => {
    // check if items is already added
    const check = state?.favourite.every((item: any) => {
      return item._id !== props?._id;
    });

    if (check) {
      const data = {
        ...props,
        quantity: 1,
      };

      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.FAVOURITE, payload: data });
      cogoToast.success("Item added to your favourite");

      // Save the updated favourite items to the database
      const updatedFavourite = [...(state?.favourite || []), data];
      const token = localStorage.getItem("token") || "";
      if (token) {
        const payload = {
          favItems: updatedFavourite,
        };

        await PatchRequest("/user/favourite", payload, token);
      }
    } else {
      cogoToast.error("Item already added to your favourite");
    }
  };

  //
  return (
    <div className="product-card">
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
        <p>₦{formatMoney(Number(props?.sellingPrice))}</p>
        <button onClick={() => router.push(`/product/${props?._id}`)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Productcard;
