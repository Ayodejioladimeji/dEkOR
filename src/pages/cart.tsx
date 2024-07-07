import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import Image from "next/image";
import React, { useContext } from "react";
import { CheckIcon, DeleteIcon } from "../../public/assets";
import SimilarProduct from "@/components/SimilarProduct";
import { useRouter } from "next/router";
import cogoToast from "cogo-toast";
import { calculateTotal, formatMoney } from "@/utils/utils";

interface Props {}

const Cart = (props: Props) => {
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();

  // increase item
  const increment = (data: any) => {
    state?.cart.forEach((item: any) => {
      if (item.id === data?.id) {
        item.quantity += 1;
      }
    });

    const carting = state?.cart.find((item) => item.id === data?.id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };

    dispatch({ type: ACTIONS.UPDATECART, payload: cartData });
  };

  // // decrease cart items
  const decrement = (data: any) => {
    state?.cart.forEach((item: any) => {
      if (item.id === data?.id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = state?.cart.find((item) => item.id === data.id);

    const cartData = {
      ...data,
      quantity: carting?.quantity,
    };

    dispatch({ type: ACTIONS.UPDATECART, payload: cartData });
  };

  // remove item from crt
  const removeCartItem = (id) => {
    const newData = state?.cart.filter((item) => item.id !== id);
    dispatch({ type: ACTIONS.DELETECART, payload: newData });
    cogoToast.success("Item removed successfully");
  };

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
                <div className="col-8">
                  {state?.cart?.map((item: any) => {
                    return (
                      <div className="cart-items" key={item.id}>
                        <div className="cart-div">
                          <div className="cart-image">
                            <Image
                              src={item?.images[0]}
                              alt="cart-image"
                              width={100}
                              height={100}
                            />
                          </div>

                          <div className="cart-content">
                            <h4>{item?.title}</h4>
                            <h3>${formatMoney(Number(item.price) * item.quantity)}</h3>

                            <div
                              style={{ background: item?.color }}
                              className="color"
                            ></div>

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
                          </div>
                        </div>

                        <div
                          className="delete"
                          onClick={() => removeCartItem(item.id)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="col-4">
                  <div className="order-summary">
                    <h4>Order Summary</h4>

                    <div className="order-box">
                      {state?.cart?.map((item:any) => {
                        return (
                          <div className="order-items" key={item.id}>
                            <div className="d-flex align-items-center gap-2">
                              <CheckIcon />
                              <p>{item?.title} ({item.quantity})</p>
                            </div>
                            <p>${item?.price}</p>
                          </div>
                        );
                      })}
                    </div>

                    <br />

                    <div className="order-items">
                      <h5>Total</h5>
                        <h5>${formatMoney(calculateTotal(state?.cart))}</h5>
                    </div>

                    <button onClick={() => router.push("/checkout")}>
                      Checkout ({state?.cart?.length})
                    </button>
                  </div>
                </div>
              </div>

              <hr />
              {/* similar products */}
              <SimilarProduct />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
