import React, { useState } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Link from "next/link";
import Loading from "@/common/loading";
import Image from "next/image";
import { PatchRequest, PostRequest } from "@/utils/requests";
import Goback from "@/common/Goback";
import AuthLayout from "./Authlayout";
import { mergeCarts } from "@/utils/utils";
import { Logo } from "../../../public/assets";

// VALIDATION REGEX

const Login = () => {
  const [buttonloading, setButtonloading] = useState(false);

  // handle submit
  const handleSubmit = async (payload: any) => {
    setButtonloading(true);

    const res = await PostRequest("/auth/login", payload);

    if (res?.status === 200) {
      localStorage.setItem("user", JSON.stringify(res?.data?.user));

      const localCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      const localFavItems = JSON.parse(localStorage.getItem("favourite")) || [];
      const pathname = localStorage.getItem("pathname");

      // Ensure the cart and favourite items are arrays before merging
      const dbCartItems = Array.isArray(res?.data?.user?.cart)
        ? res?.data?.user?.cart
        : [];
      const dbFavItems = Array.isArray(res?.data?.user?.favourite)
        ? res?.data?.user?.favourite
        : [];

      // Merge the database cart with the local cart
      const mergedCart = mergeCarts(dbCartItems, localCartItems);
      const mergedFav = mergeCarts(dbFavItems, localFavItems);

      // Save merged data to local storage
      localStorage.setItem("cart", JSON.stringify(mergedCart));
      localStorage.setItem("favourite", JSON.stringify(mergedFav));

      localStorage.setItem("token", res.data.token);

      if (pathname) {
        window.location.href = pathname;
      } else {
        window.location.href = "/product";
      }

      // Save the cart items to the database
      const token = localStorage.getItem("token") || "";
      if (token) {
        const payload = {
          cartItems: mergedCart,
        };
        const favpayload = {
          favItems: mergedFav,
        };

        await PatchRequest("/user/cart", payload, res?.data?.token);
        await PatchRequest("/user/favourite", favpayload, res?.data?.token);
      }
    } else {
      setButtonloading(false);
    }
  };

  //

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          setTimeout(async () => {
            handleSubmit(values);
          }, 500);
        }}
        //   HANDLING VALIDATION MESSAGES
        validate={(values) => {
          let errors: any = {};

          // EMAIL SECTION
          if (!values.email) {
            errors.email = "Email is Required";
          } else if (!EmailValidator.validate(values.email)) {
            errors.email = "Invalid email address";
          }

          //   THE PASSWORD SECTION
          if (!values.password) {
            errors.password = "Password is Required";
          }

          return errors;
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;

          return (
            <div className="auth">
              <div className="auth-left">
                <div
                  id="carouselExampleRide"
                  className="carousel slide"
                  data-bs-ride="true"
                >
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <Image
                        src="/images/hero1.svg"
                        className="d-block w-100"
                        alt="..."
                        width={100}
                        height={100}
                      />

                      <div className="contents">
                        <h1>Make Your Home a Haven</h1>
                        <p>
                          Explore curated collection of home decor, get inspired
                          by latest trends and create your unique style
                        </p>

                        <div className="back">
                          <Goback />
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <Image
                        src="/images/hero2.svg"
                        className="d-block w-100"
                        alt="..."
                        width={100}
                        height={100}
                      />

                      <div className="contents">
                        <h1>Make Your Home a Haven</h1>
                        <p>
                          Explore curated collection of home decor, get inspired
                          by latest trends and create your unique style
                        </p>

                        <div className="back">
                          <Goback />
                        </div>
                      </div>
                    </div>

                    <div className="carousel-item">
                      <Image
                        src="/images/hero3.svg"
                        className="d-block w-100"
                        alt="..."
                        width={100}
                        height={100}
                      />

                      <div className="contents">
                        <h1>Make Your Home a Haven</h1>
                        <p>
                          Explore curated collection of home decor, get inspired
                          by latest trends and create your unique style
                        </p>

                        <div className="back">
                          <Goback />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="auth-right">
                <div className="auth-form">
                  <Link href="/product" className="d-block mb-5">
                    <Logo />
                  </Link>

                  <h1>Welcome back!</h1>

                  <small>Stay trendy, Stay you.</small>

                  <form onSubmit={handleSubmit}>
                    <div className="form-box">
                      <label htmlFor="email">Email</label>
                      <input
                        name="email"
                        type="text"
                        placeholder="bright@example.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && (
                        <div className="input_feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-box">
                      <label htmlFor="password">Password</label>
                      <input
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        value={values.password}
                        autoComplete="on"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && (
                        <div className="input_feedback">{errors.password}</div>
                      )}

                      <Link
                        href="/auth/forgot-password"
                        className="password-forgot"
                      >
                        forgot password?
                      </Link>
                    </div>

                    <div className="form-box">
                      <button type="submit" disabled={buttonloading}>
                        {buttonloading ? (
                          <Loading
                            width="25px"
                            height="25px"
                            primaryColor="#fff"
                            secondaryColor="#fff"
                          />
                        ) : (
                          "Login"
                        )}
                      </button>
                    </div>

                    <small className="text-center">
                      Not a customer?{" "}
                      <Link href="/auth/register">Register</Link>
                    </small>
                  </form>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
