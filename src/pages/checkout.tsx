import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import React, { useState } from "react";
import { CheckIcon, CircleIcon } from "../../public/assets";
import { useRouter } from "next/router";

interface Props {}

const Checkout = (props: Props) => {
  const router = useRouter();
  const [shippingType, setShippingType] = useState("standard");

  //
  return (
    <Layout>
      <div className="checkout">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="Checkout" />
          </div>

          <div className="row">
            <div className="col-8">
              <div className="form-box">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your fullname" />
              </div>

              <div className="form-box">
                <label>Email Address</label>
                <input type="text" placeholder="Enter your email" />
              </div>

              <div className="form-box">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter your phone number" />
              </div>

              <div className="row">
                <div className="col-6">
                  <div className="form-box">
                    <label>Country</label>
                    <input type="text" placeholder="Enter your country" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-box">
                    <label>State</label>
                    <input type="text" placeholder="Enter your state" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-box">
                    <label>City</label>
                    <input type="text" placeholder="Enter your city" />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-box">
                    <label>Address</label>
                    <input type="text" placeholder="Enter your address" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="order-summary">
                <h4>Shipping Type</h4>

                <div className="order-box">
                  <div
                    className="order-items"
                    onClick={() => setShippingType("standard")}
                  >
                    <div className="d-flex align-items-center gap-2">
                      {shippingType === "standard" ? (
                        <CheckIcon />
                      ) : (
                        <CircleIcon />
                      )}
                      <p>Standard Shipping</p>
                    </div>
                    <p>$80</p>
                  </div>

                  <div
                    className="order-items"
                    onClick={() => setShippingType("express")}
                  >
                    <div className="d-flex align-items-center gap-2">
                      {shippingType === "express" ? (
                        <CheckIcon />
                      ) : (
                        <CircleIcon />
                      )}
                      <p>Express Shipping</p>
                    </div>
                    <p>$100</p>
                  </div>
                </div>

                <h4>Order Summary</h4>
                <div className="order-items">
                  <h5>Subtotal</h5>
                  <h5>$200</h5>
                </div>
                <div className="order-items">
                  <h5>Total</h5>
                  <h5>$280</h5>
                </div>

                <button onClick={() => router.push("/checkout")}>
                  Checkout Payment ($280)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
