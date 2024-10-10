import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import React, { useContext, useEffect, useState } from "react";
import { CheckIcon, CircleIcon } from "../../../public/assets";
import { calculateTotal, EmptyImagesCheck, formatMoney } from "@/utils/utils";
import { DataContext } from "@/store/GlobalState";
import SuccessModal from "@/common/modals/success";
import cogoToast from "cogo-toast";
import { GetRequests } from "@/utils/requests";
import PaymentSkeleton from "@/common/paymentskeleton";
import CheckoutAddressCard from "@/common/checkoutaddresscard";

const initialValues = {
  fullname: "",
  email: "",
  phone: "",
  address: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
};

const Checkout = () => {
  const [shippingType, setShippingType] = useState("standard");
  const [amount, setAmount] = useState(1000);
  const { state } = useContext(DataContext);
  const [showmodal, setShowmodal] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [count, setCount] = useState(1);
  const [addresses, setAddresses] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getAddress = async () => {
      const res = await GetRequests("/address-book", token);
      if (res?.status === 200 || res?.status === 201) {
        setAddresses(res?.data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    getAddress();
  }, [state?.callback]);

  // handle change for inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // handle shipping
  const handleShipping = (item: string) => {
    setShippingType(item);
    if (item === "standard") {
      setAmount(1000);
    } else {
      setAmount(4000);
    }
  };

  // handle submit
  const handleCheckout = () => {
    // check if the product has images
    const checkImage = EmptyImagesCheck(state?.cart);
    if (!checkImage) {
      return cogoToast.error("Product has no images, You can't proceed");
    }

    if (
      !values?.fullname ||
      !values?.email ||
      !values?.phone ||
      !values.address ||
      !values.country ||
      !values.state ||
      !values.city ||
      !values.postalCode ||
      values.country === "---"
    ) {
      return cogoToast.error(
        "Please provide all your shipping information in details"
      );
    }
    setShowmodal(true);
  };

  //
  return (
    <Layout>
      <div className="checkout">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="Checkout" route="cart" />
          </div>

          <h2>Delivery Information</h2>

          <div className="information">
            <div className="top">
              <button
                onClick={() => setCount(1)}
                className={count === 1 ? "active" : ""}
              >
                New Address
              </button>

              <button
                onClick={() => setCount(2)}
                className={count === 2 ? "active" : ""}
              >
                Default address
              </button>
            </div>

            <div className="bottom">
              <div className="row">
                {count === 1 && (
                  <div className="col-12 col-12 col-lg-8">
                    <div className="form-box">
                      <label>Full Name</label>
                      <input
                        type="text"
                        placeholder="Enter your fullname"
                        value={values.fullname}
                        name="fullname"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-box">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="Enter your phone number"
                        value={values.phone}
                        name="phone"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-box">
                      <label>Address</label>
                      <input
                        type="text"
                        placeholder="Enter your address"
                        value={values.address}
                        name="address"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="row">
                      <div className="col-12 col-sm-6 col-md-6">
                        <div className="form-box">
                          <label>Region</label>
                          <input
                            type="text"
                            placeholder="Enter your state"
                            value={values.state}
                            name="state"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-md-6">
                        <div className="form-box">
                          <label>City</label>
                          <input
                            type="text"
                            placeholder="Enter your city"
                            value={values.city}
                            name="city"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {count === 2 && (
                  <div className="col-12 col-12 col-lg-8">
                    {loading ? (
                      <PaymentSkeleton length={4} />
                    ) : (
                      <>
                        {addresses?.map((item: any) => {
                          return (
                            <CheckoutAddressCard {...item} key={item._id} />
                          );
                        })}
                      </>
                    )}
                  </div>
                )}

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
                        <p>₦1000</p>
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
                        <p>₦4000</p>
                      </div>
                    </div>

                    <h4>Order Summary</h4>
                    <div className="order-items">
                      <h5>Subtotal</h5>
                      <h5>₦{formatMoney(calculateTotal(state?.cart))}</h5>
                    </div>
                    <div className="order-items">
                      <h5>Total</h5>
                      <h5>
                        ₦{formatMoney(calculateTotal(state?.cart) + amount)}
                      </h5>
                    </div>

                    <button onClick={handleCheckout}>
                      Checkout Payment (₦
                      {formatMoney(calculateTotal(state?.cart) + amount)})
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* success modal */}
      {showmodal && (
        <SuccessModal
          show={showmodal}
          onHide={setShowmodal}
          name={values.fullname}
        />
      )}
    </Layout>
  );
};

export default Checkout;
