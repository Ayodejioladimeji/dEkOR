import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { Image } from "react-bootstrap";
import { DeleteFavourite, ItemCart } from "../../public/assets";
import { firstTwoWords, formatMoney } from "@/utils/utils";

//

const Favouritecard = (props: any) => {
  const { state, dispatch } = useContext<any>(DataContext);
  const router = useRouter();

  // add items to cart
  const addToCart = () => {
    // check if items is already added
    const check = state?.cart.every((item: any) => {
      return item._id !== props?._id;
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
  const removeFavourite = () => {
    const newData = state?.favourite.filter(
      (item: any) => item._id !== props?._id
    );
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.DELETEFAVOURITE, payload: newData });
    cogoToast.success("Item removed successfully");
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
        <h3>{firstTwoWords(props?.title)}</h3>
        <p>₦{formatMoney(Number(props?.sellingPrice))}</p>
        <button onClick={() => router.push(`/product/${props?._id}`)}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Favouritecard;
