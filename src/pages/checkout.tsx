import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import { CheckIcon, CircleIcon } from "../../public/assets";
import { useRouter } from "next/router";
import { calculateTotal, formatMoney } from "@/utils/utils";
import { DataContext } from "@/store/GlobalState";

interface Props {}

const Checkout = (props: Props) => {
  const router = useRouter();
  const [shippingType, setShippingType] = useState("standard");
  const [amount, setAmount] = useState(80);
  const { state } = useContext(DataContext);

  // handle shipping
  const handleShipping = (item: string) => {
    setShippingType(item);
    if (item === "standard") {
      setAmount(80);
    } else {
      setAmount(100);
    }
  };

  //
  return (
    <Layout>
      <div className="checkout">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="Checkout" route="cart" />
          </div>

          <div className="row">
            <div className="col-12 col-12 col-lg-8">
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

              <div className="form-box">
                <label>Address</label>
                <input type="text" placeholder="Enter your address" />
              </div>

              <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>Country</label>
                    <select className="form-select">
                      <option>Nigeria</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>State</label>
                    <input type="text" placeholder="Enter your state" />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>City</label>
                    <input type="text" placeholder="Enter your city" />
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>Postal Code</label>
                    <input type="text" placeholder="Enter your postal code" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-12 col-lg-4">
              <div className="order-summary">
                <h4>Shipping Type</h4>

                <div className="order-box">
                  <div
                    className="order-items"
                    onClick={() => handleShipping("standard")}
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
                    onClick={() => handleShipping("express")}
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
                  <h5>${formatMoney(calculateTotal(state?.cart))}</h5>
                </div>
                <div className="order-items">
                  <h5>Total</h5>
                  <h5>${formatMoney(calculateTotal(state?.cart) + amount)}</h5>
                </div>

                <button onClick={() => router.push("/checkout")}>
                  Checkout Payment ($
                  {formatMoney(calculateTotal(state?.cart) + amount)})
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
