import Breadcumb from "@/common/breadcumb";
import Loading from "@/common/loading";
import Layout from "@/components/Layout";
import { data } from "@/constants/data";
import { ACTIONS } from "@/store/Actions";
import { DataContext } from "@/store/GlobalState";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Ratings } from "../../../public/assets";
import SimilarProduct from "@/components/SimilarProduct";
import cogoToast from "cogo-toast";

interface Props {}

const Product = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productColor, setProductColor] = useState("");
  const [imageIndex, setImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [count, setCount] = useState(4);

  // Get product details
  useEffect(() => {
    setLoading(true);
    if (slug) {
      const foundProduct = data.find((item) => item.id === slug);
      if (foundProduct) {
        setProduct(foundProduct);
        // Check if the product already exists in the cart
        const existingCartItem = state.cart.find(
          (item) => item.id === foundProduct.id
        );
        if (existingCartItem) {
          setQuantity(existingCartItem.quantity); // Set quantity from cart
        }
      }
      setLoading(false);
    }
  }, [slug, state.cart]);

  // Add item to cart
  const addToCart = () => {
    const check = state.cart.every((item) => item.id !== product.id);
    if (check) {
      const cartData = {
        ...product,
        quantity: quantity,
      };
      dispatch({ type: ACTIONS.CART, payload: cartData });
      setProduct(cartData);
      cogoToast.success("Item added to your cart");
    } else {
      cogoToast.error("Item already added to your cart");
    }
  };

  // Increment item quantity
  const increment = () => {
    const check = state.cart.every((item) => item.id !== product.id);
    if (check) {
      return cogoToast.error("Please add item to you cart to continue");
    }
    setQuantity(quantity + 1);
    state?.cart.forEach((item: any) => {
      if (item.id === product?.id) {
        item.quantity += 1;
      }
    });
  };

  // Decrement item quantity
  const decrement = () => {
    const check = state.cart.every((item) => item.id !== product.id);
    if (check) {
      return cogoToast.error("Please add item to you cart to continue");
    }

    if (quantity > 1) {
      setQuantity(quantity - 1);
       state?.cart.forEach((item: any) => {
         if (item.id === product?.id) {
           if (item.quantity === 1) return;
           item.quantity -= 1;
         }
       });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <Loading
            primaryColor="#000"
            secondaryColor="#000"
            width="50px"
            height="50px"
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-details">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title={product?.title} />
          </div>

          <div className="content">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div className="row">
                  <div className="col-12 col-sm-9">
                    <div className="detail-image">
                      <Image
                        src={product?.images && product?.images[imageIndex]}
                        alt="product-image"
                        width={100}
                        height={100}
                        unoptimized
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-3">
                    <div className="thumb">
                      {product?.images?.map((img, index) => (
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
                  </div>
                </div>
              </div>

              <div className="col-12 col-lg-6 content-details">
                <div className="title">
                  <h1>{product?.title}</h1>
                  <Ratings />
                </div>
                <p>{product?.description}</p>

                <h3>${product?.price}</h3>

                <div className="color-div">
                  {product?.colors?.map((color: any, index: number) => (
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
                  <p> Item Description</p>
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

          {/* similar products */}
          <SimilarProduct />
        </div>
      </div>
    </Layout>
  );
};

export default Product;
