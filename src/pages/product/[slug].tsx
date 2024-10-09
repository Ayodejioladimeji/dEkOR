import Breadcumb from "@/common/breadcumb";
import Loading from "@/common/loading";
import Layout from "@/components/Layout";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Ratings } from "../../../public/assets";
import SimilarProduct from "@/components/SimilarProduct";
import cogoToast from "cogo-toast";
import { GetRequest, PatchRequest } from "@/utils/requests";
import { formatMoney } from "@/utils/utils";

const Product = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productColor, setProductColor] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (slug) {
      const getProduct = async () => {
        const res: any = await GetRequest(`/product/${slug}`);

        if (res?.status === 200) {
          setProduct(res?.data);
          // Check if the product already exists in the cart
          const existingCartItem = state.cart.find(
            (item: any) => item.id === res?.data?._id
          );
          if (existingCartItem) {
            setQuantity(existingCartItem.quantity);
          }

          setLoading(false);
        }
      };
      getProduct();
    }
  }, [slug, state?.cart]);

  // Add item to cart
  const addToCart = async () => {
    const check = state.cart.every((item) => item._id !== product._id);
    if (check) {
      const cartData = {
        ...product,
        quantity: quantity,
      };
      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      dispatch({ type: ACTIONS.CART, payload: cartData });
      setProduct(cartData);
      cogoToast.success("Item added to your cart");

      // save the cart items to the database
      const token = localStorage.getItem("token") || "";
      if (token) {
        const payload = {
          cartItems: state?.cart,
        };

        await PatchRequest("/user/cart", payload, token);
      }
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  // Increment item quantity
  const increment = async () => {
    const check = state.cart.every((item) => item.id !== product.id);
    if (check) {
      return cogoToast.error("Please add item to you cart to continue");
    }
    setQuantity(quantity + 1);
    dispatch({ type: ACTIONS.TOGGLE, payload: true });
    state?.cart.forEach((item: any) => {
      if (item.id === product?.id) {
        item.quantity += 1;
      }
    });

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        cartItems: state?.cart,
      };

      await PatchRequest("/user/cart", payload, token);
    }
  };

  // Decrement item quantity
  const decrement = async () => {
    const check = state.cart.every((item) => item.id !== product.id);
    if (check) {
      return cogoToast.error("Please add item to you cart to continue");
    }

    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch({ type: ACTIONS.TOGGLE, payload: true });
      state?.cart.forEach((item: any) => {
        if (item.id === product?.id) {
          if (item.quantity === 1) return;
          item.quantity -= 1;
        }
      });
    }

    // save the cart items to the database
    const token = localStorage.getItem("token") || "";
    if (token) {
      const payload = {
        cartItems: state?.cart,
      };

      await PatchRequest("/user/cart", payload, token);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            height: "80vh",
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
          Loading Product
        </div>
      </Layout>
    );
  }

  //

  return (
    <Layout>
      <div className="product-details">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title={product?.title} route="product" />
          </div>

          <div className="content">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="row">
                  <div className="col-12 col-sm-9">
                    <div className="detail-image">
                      <Image
                        src={
                          product?.images?.length >= 1
                            ? product?.images[imageIndex]
                            : "/images/placehoder.jpg"
                        }
                        alt="product-image"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-3">
                    {product?.images?.length === 0 ? (
                      <div className="thumb">
                        <div className="image-box">
                          <Image
                            src="/images/placehoder.jpg"
                            alt=""
                            width={100}
                            height={100}
                            unoptimized
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="thumb">
                        {product?.images?.map((img: any, index: number) => (
                          <div
                            className={`image-box ${
                              imageIndex === index ? "image-active" : ""
                            }`}
                            key={index}
                          >
                            <Image
                              src={img}
                              alt=""
                              onClick={() => setImageIndex(index)}
                              width={100}
                              height={100}
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 content-details">
                <div className="title">
                  <h1>{product?.title}</h1>
                  <Ratings />
                </div>
                <p>{product?.description}</p>

                <h3>${formatMoney(Number(product?.sellingPrice))}</h3>

                <div className="color-div">
                  {product?.productColors?.map((color: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => setProductColor(color)}
                      className={
                        productColor === color ? "active-color" : "main-color"
                      }
                    >
                      <div
                        className="actual-color"
                        style={{ background: color }}
                      ></div>
                    </div>
                  ))}
                </div>

                <h4>Quantity</h4>
                <div className="quantities">
                  <i className="bi bi-dash" onClick={decrement}></i>
                  <p>{quantity}</p>
                  <i className="bi bi-plus" onClick={increment}></i>
                </div>

                <div className="button-container">
                  <button onClick={addToCart}>Add To Cart</button>
                  <button onClick={() => router.push("/cart")}>Checkout</button>
                </div>
              </div>
            </div>
          </div>

          <hr />

          {/* more information section */}
          <div className="information">
            <div className="top">
              <button
                onClick={() => setCount(1)}
                className={count === 1 ? "active" : ""}
              >
                Description
              </button>
              <button
                onClick={() => setCount(2)}
                className={count === 2 ? "active" : ""}
              >
                Shipping
              </button>
              <button
                onClick={() => setCount(3)}
                className={count === 3 ? "active" : ""}
              >
                Reviews
              </button>
              <button
                onClick={() => setCount(4)}
                className={count === 4 ? "active" : ""}
              >
                Return Policy
              </button>
            </div>

            <div className="bottom">
              {count === 1 && (
                <div className="description">
                  <p>{product?.description}</p>
                </div>
              )}
              {count === 2 && (
                <div className="shipping">
                  <p>Shipping Information</p>
                </div>
              )}
              {count === 3 && (
                <div className="reviews">
                  <p> Item Review</p>
                </div>
              )}
              {count === 4 && (
                <div className="policy">
                  <h4>Our Return Policy and Guarantee</h4>
                  <p>
                    Exchange within 30 days from the date product was delivered
                  </p>
                  <h4>Requirement</h4>
                  <ol>
                    <li>
                      Items shouldn’t stay more than 30 days from delivery date.
                    </li>
                    <li>
                      Items should remain unused, not damaged, and in the
                      original package.
                    </li>
                    <li>Shipping fees won’t be covered by the company.</li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* similar products - render if a product category is found */}
          <SimilarProduct id={product?.category} />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
