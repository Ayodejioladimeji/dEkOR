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

interface Props {}

const Product = (props: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useContext(DataContext);
  const [productColor, setProductColor] = useState("");
  const [imageIndex, setImageIndex] = useState(0);

  //  get detail product
  useEffect(() => {
    if (slug) {
      data?.find((item) => {
        console.log(item.id, slug);
        if (item.id === slug) {
          setProduct(item);
          setLoading(false);
        }
      });
    }
  }, [slug]);

  // increase item
  const increment = () => {
    state?.cart.forEach((item) => {
      if (item.id === product?.id) {
        item.quantity += 1;
      }
    });

    const carting = state?.cart.find((item) => item.id === product?.id);

    const cartData = {
      ...product,
      quantity: carting?.quantity,
    };

    //  dispatch({ type: ACTIONS.CART, payload: cartData });
  };

  // // decrease cart items
  const decrement = () => {
    state?.cart.forEach((item) => {
      if (item.id === product.id) {
        if (item.quantity === 1) return;
        item.quantity -= 1;
      }
    });

    const carting = state?.cart.find((item) => item.id === product.id);

    const cartData = {
      ...product,
      quantity: carting?.quantity,
    };

    //  dispatch({ type: ACTIONS.CART, payload: cartData });
  };

  console.log(product?.images);

  //

  return (
    <Layout>
      <div className="product-details">
        {loading ? (
          <div className="loading">
            <Loading
              primaryColor="#000"
              secondaryColor="#000"
              width="50px"
              height="50px"
            />
          </div>
        ) : (
          <div className="container">
            <div className="heading-section">
              <Breadcumb title={product?.title} />
            </div>

            <div className="content">
              <div className="row">
                <div className="col">
                  <div className="row">
                    <div className="col-9">
                      <div className="detail-image">
                        <Image
                          src={product?.images && product?.images[imageIndex]}
                          alt="product-image"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>

                    <div className="col-3">
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
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col">
                  <div className="title">
                    <h1>{product?.title}</h1>
                    <Ratings />
                  </div>
                  <p>{product?.description}</p>

                  <h3>${product?.price}</h3>

                  <div className="color-div">
                    {product?.colors?.map((color, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => setProductColor(color)}
                          className={
                            productColor === color
                              ? "active-color"
                              : "main-color"
                          }
                        >
                          <div
                            className="actual-color"
                            style={{ background: color }}
                          ></div>
                        </div>
                      );
                    })}
                  </div>

                  <h4>Quantity</h4>
                  <div className="quantities">
                    <i className="bi bi-dash" onClick={decrement}></i>

                    <p>{product?.quantity}</p>

                    <i className="bi bi-plus" onClick={increment}></i>
                  </div>

                  <div className="button-container">
                    <button>Add To Cart</button>
                    <button>Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;
