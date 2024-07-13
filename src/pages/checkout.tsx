import Breadcumb from "@/common/breadcumb";
import Layout from "@/components/Layout";
import React, { useContext, useState } from "react";
import { CheckIcon, CircleIcon } from "../../public/assets";
import { useRouter } from "next/router";
import { calculateTotal, formatMoney } from "@/utils/utils";
import { DataContext } from "@/store/GlobalState";
import SuccessModal from "@/common/modals/success";
import cogoToast from "cogo-toast";

interface Props {}

const initialValues = {
  fullname:"",
  email:"",
  phone:"",
  address:"",
  country:"",
  state:"",
  city:"",
  postalCode:""
}

const Checkout = (props: Props) => {
  const router = useRouter();
  const [shippingType, setShippingType] = useState("standard");
  const [amount, setAmount] = useState(80);
  const { state } = useContext(DataContext);
  const [showmodal, setShowmodal] = useState(false);
  const [values, setValues] = useState(initialValues)

  // handle change
  const handleChange = (e) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  // handle shipping
  const handleShipping = (item: string) => {
    setShippingType(item);
    if (item === "standard") {
      setAmount(80);
    } else {
      setAmount(100);
    }
  };

  // handle submit
  const handleCheckout = () => {
    console.log(values)
    if(!values?.fullname || !values?.email || !values?.phone || !values.address || !values.country || !values.state || !values.city || !values.postalCode || values.country === "---"){
      return cogoToast.error("Please provide all your shipping information in details")
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

          <div className="row">
            <div className="col-12 col-12 col-lg-8">
              <div className="form-box">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your fullname" value={values.fullname} name="fullname" onChange={handleChange}/>
              </div>

              <div className="form-box">
                <label>Email Address</label>
                <input type="text" placeholder="Enter your email" value={values.email} name="email" onChange={handleChange}/>
              </div>

              <div className="form-box">
                <label>Phone Number</label>
                <input type="text" placeholder="Enter your phone number" value={values.phone} name="phone" onChange={handleChange}/>
              </div>

              <div className="form-box">
                <label>Address</label>
                <input type="text" placeholder="Enter your address" value={values.address} name="address" onChange={handleChange}/>
              </div>

              <div className="row">
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>Country</label>
                    <select className="form-select" value={values.country} name="country" onChange={handleChange}>
                      <option defaultValue="">---</option>
                      <option value="nigeria">Nigeria</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>State</label>
                    <input type="text" placeholder="Enter your state" value={values.state} name="state" onChange={handleChange}/>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>City</label>
                    <input type="text" placeholder="Enter your city" value={values.city} name="city" onChange={handleChange}/>
                  </div>
                </div>
                <div className="col-12 col-sm-6 col-md-6">
                  <div className="form-box">
                    <label>Postal Code</label>
                    <input type="text" placeholder="Enter your postal code" value={values.postalCode} name="postalCode" onChange={handleChange}/>
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

                <button onClick={handleCheckout}>
                  Checkout Payment ($
                  {formatMoney(calculateTotal(state?.cart) + amount)})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* success modal */}
      {showmodal && <SuccessModal show={showmodal} onHide={setShowmodal} name={values.fullname} />}
    </Layout>
  );
};

export default Checkout;
