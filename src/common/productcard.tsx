import { data } from "@/constants/data";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { ItemCart } from "../../public/assets";

interface Props {
  id: string;
  title: string;
  price: string;
  images: string[];
  ratings: string;
  category: string;
}

const Productcard = (props: Props) => {
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
        id: props?.id,
        title: props?.title,
        price: props?.price,
        category: props?.category,
        ratings: props?.ratings,
        images: props?.images,
        quantity: 1,
      };

      dispatch({ type: ACTIONS.CART, payload: cartData });
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  //
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={props?.images[0]}
          alt="product-image"
          width={100}
          height={100}
        />

        <div className="item-cart" onClick={addToCart}>
          <ItemCart />
        </div>

        <button onClick={addToCart} className="add-to-cart">
          Add to cart
        </button>
      </div>

      <div className="product-content">
        <h3>{props?.title}</h3>
        <p>${props?.price}</p>
        <button onClick={() => router.push(`/product/${props?.id}`)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Productcard;
