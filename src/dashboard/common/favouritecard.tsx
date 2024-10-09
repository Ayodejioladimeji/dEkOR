import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { firstTwoWords, formatMoney } from "@/utils/utils";
import { DeleteFavourite, ItemCart } from "../../../public/assets";
import { PostRequest } from "@/utils/requests";
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

//

const Favouritecard = (props: any) => {
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

      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.CART, payload: cartData });
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  // remove item from favourites
  const removeFavourite = async () => {
    const newData = state?.favourite.filter((item) => item.id !== props?.id);
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.DELETEFAVOURITE, payload: newData });
    cogoToast.success("Item removed successfully");

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        productId: props?.id,
      };

      await PostRequest("/user/favourite", payload, token);
    }
  };

  //
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={IMAGE_URL + "/images/" + props?.photos[0]?.url}
          alt="product-image"
          width={100}
          height={100}
        />

        <div className="favourite" onClick={removeFavourite}>
          <DeleteFavourite />
        </div>

        <div className="item-cart" onClick={addToCart}>
          <ItemCart />
        </div>

        <button onClick={addToCart} className="add-to-cart">
          Add to cart
        </button>
      </div>

      <div className="product-content">
        <h3>{firstTwoWords(props?.name)}</h3>
        <p>${formatMoney(Number(props?.current_price[0]?.USD[0]))}</p>
        <button onClick={() => router.push(`/product/${props?.id}`)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Favouritecard;
