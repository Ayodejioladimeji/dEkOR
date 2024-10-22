import React, { useState } from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Link from "next/link";
import Loading from "@/common/loading";
import Image from "next/image";
import { PostRequest } from "@/utils/requests";
import Goback from "@/common/Goback";
import AuthLayout from "./Authlayout";
import { Logo } from "../../../public/assets";
import cogoToast from "cogo-toast";
import { useRouter } from "next/router";

// VALIDATION REGEX

const ForgotPassword = () => {
  const [buttonloading, setButtonloading] = useState(false);
  const router = useRouter();

  // handle submit
  const handleSubmit = async (payload: any) => {
    setButtonloading(true);

    const res = await PostRequest("/auth/forgot-password", payload);

    if (res?.status === 200 || res?.status === 201) {
      localStorage.setItem("activation_token", res?.data?.activation_token);
      cogoToast.success(res?.data?.message);
      router.push("/auth/reset-password");
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

                  <h1>Forgot Your Password?</h1>

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
                      <button type="submit" disabled={buttonloading}>
                        {buttonloading ? (
                          <Loading
                            width="25px"
                            height="25px"
                            primaryColor="#fff"
                            secondaryColor="#fff"
                          />
                        ) : (
                          "Submit"
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

export default ForgotPassword;
