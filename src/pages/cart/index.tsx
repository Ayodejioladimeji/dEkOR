import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { CheckIcon, DeleteIcon } from "../../../public/assets";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import { calculateTotal, formatMoney } from "@/utils/utils";
import MoreProduct from "../../components/MoreProducts";
import Loading from "@/common/loading";
import { PatchRequest, PostRequest } from "@/utils/requests";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const [selectedColors, setSelectedColors] = useState({});

  // Function to set the color for a specific item
  const setProductColor = (itemId: string, color: string) => {
    setSelectedColors((prev) => ({
      ...prev,
      [itemId]: color,
    }));

    // Find the item in the cart and add the selected color to it
    const item = state?.cart.find((cartItem: any) => cartItem._id === itemId);
    if (item) {
      addColorToProduct(item, color);
    }
  };

  const addColorToProduct = async (data: any, selectedColor: string) => {
    state?.cart.forEach((item: any) => {
      if (item._id === data?._id) {
        item.selectedColor = selectedColor;
      }
    });

    const cartItem = state?.cart.find((item) => item._id === data?._id);

    const cartData = {
      ...data,
      selectedColor: cartItem?.selectedColor,
    };

    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.UPDATECART, payload: cartData });
  };

  // increase cart item
  const increment = async (data: any) => {
    state?.cart.forEach((item: any) => {
      if (item._id === data?._id) {
        item.quantity += 1;
      }
    });

    const carting = state?.cart.find((item) => item._id === data?._id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.UPDATECART, payload: cartData });

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        cartItems: state?.cart,
      };

      await PatchRequest("/user/cart", payload, token);
    }
  };

  // // decrease cart items
  const decrement = async (data: any) => {
    state?.cart.forEach((item: any) => {
      if (item._id === data?._id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = state?.cart.find((item) => item._id === data._id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.UPDATECART, payload: cartData });

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        cartItems: state?.cart,
      };

      await PatchRequest("/user/cart", payload, token);
    }
  };

  // remove item from cart
  const removeCartItem = async (id) => {
    const newData = state?.cart.filter((item) => item._id !== id);
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.DELETECART, payload: newData });
    cogoToast.success("Item removed successfully");

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        productId: id,
      };

      await PostRequest("/user/cart", payload, token);
    }
  };

  // clear user cart
  const clearCart = async () => {
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    dispatch({ type: ACTIONS.DELETECART, payload: [] });
    cogoToast.success("Cart cleared successfully");

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        cartItems: [],
      };

      await PatchRequest("/user/cart", payload, token);
    }
  };

  // handle route
  const handleRoute = () => {
    const token = localStorage.getItem("token") || "";

    // first check if the user chooses a color
    const unselectedItem = state.cart.find((item) => !selectedColors[item._id]);

    if (unselectedItem) {
      return cogoToast.error("Please select a color for your product");
    }

    if (token) {
      router.push("/checkout");
    } else {
      localStorage.setItem("pathname", router?.pathname);
      router.push("/auth/login");
    }
  };

  //
  if (state?.loading) {
    return (
      <Layout>
        <div
          style={{
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Loading
            primaryColor="#000"
            secondaryColor="#000"
            width="50px"
            height="50px"
          />
          Loading Cart
        </div>
      </Layout>
    );
  }

  //

  return (
    <Layout>
      <div className="cart">
        <div className="container">
          {state?.cart?.length === 0 ? (
            <div className="main-cart-empty">
              <div className="cart-empty">
                <div className="image-box">
                  <Image
                    src="/images/empty-cart.png"
                    alt=""
                    width={100}
                    height={100}
                    unoptimized
                  />
                </div>

                <h3>Your cart is empty</h3>
                <button
                  onClick={() => router.push("/product")}
                  className="start-shopping"
                >
                  Start Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="heading-section">
                <Breadcumb title="Cart" />
              </div>

              <div className="row">
                <div className="col-12 col-lg-8">
                  {state?.cart?.map((item: any) => {
                    const img = item?.images?.find((_, index) => index === 0);

                    return (
                      <div className="cart-items" key={item._id}>
                        <div className="cart-div">
                          <div
                            className="cart-image"
                            onClick={() => router.push(`/product/${item?._id}`)}
                          >
                            <Image
                              src={!img ? "/images/placehoder.jpg" : img}
                              alt="cart-image"
                              width={100}
                              height={100}
                              unoptimized
                            />
                          </div>

                          <div className="cart-content">
                            <h4>{item?.title}</h4>
                            <h3>
                              ₦
                              {formatMoney(
                                Number(item.sellingPrice) *
                                  Number(item.quantity)
                              )}
                            </h3>

                            <div className="quantities">
                              <i
                                className="bi bi-dash"
                                onClick={() => decrement(item)}
                              ></i>

                              <p>{item?.quantity}</p>

                              <i
                                className="bi bi-plus"
                                onClick={() => increment(item)}
                              ></i>
                            </div>

                            <div className="color-div">
                              {item?.productColors?.map(
                                (color: any, index: number) => (
                                  <div
                                    key={index}
                                    onClick={() =>
                                      setProductColor(item._id, color)
                                    } // Pass the itemId and selected color
                                  >
                                    <div
                                      className={`actual-color ${selectedColors[item._id] === color ? "active-color" : ""}`}
                                      style={{ background: color }}
                                    ></div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className="delete"
                          onClick={() => removeCartItem(item._id)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    );
                  })}

                  <div className="clear-cart">
                    <button onClick={clearCart}>Clear cart</button>
                  </div>
                </div>

                <div className="col-12 col-lg-4">
                  <div className="order-summary">
                    <h4>Order Summary</h4>

                    <div className="order-box">
                      {state?.cart?.map((item: any) => {
                        return (
                          <div className="order-items" key={item._id}>
                            <div className="d-flex align-items-center gap-2">
                              <CheckIcon />
                              <p>
                                {item?.title} ({item.quantity})
                              </p>
                            </div>
                            {/* <p>${item?.current_price[0]?.USD[0]}</p> */}
                          </div>
                        );
                      })}
                    </div>

                    <br />

                    <div className="order-items">
                      <h5>Total</h5>
                      <h5>₦{formatMoney(calculateTotal(state?.cart))}</h5>
                    </div>

                    <button onClick={handleRoute}>
                      Checkout ({state?.cart?.length})
                    </button>
                  </div>
                </div>
              </div>

              <hr />
              {/* more products */}
              <MoreProduct />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
