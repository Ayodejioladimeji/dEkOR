import React, { useState } from "react";
import { Formik } from "formik";

// COMPONENTS
import Link from "next/link";
import Loading from "@/common/loading";
import Image from "next/image";
import { PostRequest } from "@/utils/requests";
import Goback from "@/common/Goback";
import AuthLayout from "./Authlayout";
import { Logo } from "../../../public/assets";
import { useRouter } from "next/router";

// VALIDATION REGEX

const Login = () => {
  const [buttonloading, setButtonloading] = useState(false);
  const router = useRouter();

  // handle submit
  const handleSubmit = async (payload: any) => {
    setButtonloading(true);

    const res = await PostRequest("/auth/login", payload);

    if (res?.status === 200) {
      router.push("/auth/login");
    } else {
      setButtonloading(false);
    }
  };

  //

  return (
    <AuthLayout>
      <Formik
        initialValues={{
          code: "",
          email: "",
          password: "",
          password2: "",
        }}
        onSubmit={(values) => {
          setTimeout(async () => {
            handleSubmit(values);
          }, 500);
        }}
        //   HANDLING VALIDATION MESSAGES
        validate={(values) => {
          let errors: any = {};

          if (!values.code) {
            errors.code = "OTP code is required";
          }

          //   THE PASSWORD SECTION
          if (!values.password) {
            errors.password = "Password is Required";
          }

          if (values.password !== values.password2) {
            errors.password2 = "Password do not match";
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

                  <h1>Reset Your Password!</h1>

                  <small>Stay trendy, Stay you.</small>

                  <form onSubmit={handleSubmit}>
                    <div className="form-box">
                      <label htmlFor="email">OTP Code</label>
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
                    </div>

                    <div className="form-box">
                      <label htmlFor="password">Confirm Password</label>
                      <input
                        name="password"
                        type="password"
                        placeholder="Confirm your password"
                        value={values.password2}
                        autoComplete="on"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password2 && touched.password2 && (
                        <div className="input_feedback">{errors.password2}</div>
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
