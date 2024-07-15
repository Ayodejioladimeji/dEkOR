import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Link from "next/link";
// import { useRouter } from "next/router";
// import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import Goback from "@/common/Goback";
import Image from "next/image";

// VALIDATION REGEX

const Login = () => {
  // const [loading, setLoading] = useState(false)
  // const router = useRouter()

  // handle submit
  const handleSubmit = async (payload) => {
    console.log(payload);
  };

  //

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(async () => {
          handleSubmit(values);

          setSubmitting(false);
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
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="auth">
            <div className="auth-left">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="back bg-danger">
                  <Goback />
                </div>

                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>

                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Image
                      src="/images/hero7.svg"
                      className="d-block w-100"
                      alt="hero-images"
                      width={100}
                      height={100}
                      unoptimized
                    />

                    <div className="contents">
                      <h1>Make Your Home a Haven</h1>
                      <p>
                        Explore curated collection of home decor, get inspired
                        by latest trends and create your unique style
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <Image
                      src="/images/hero6.svg"
                      className="d-block w-100"
                      alt="hero-images"
                      width={100}
                      height={100}
                      unoptimized
                    />

                    <div className="contents">
                      <h1>Make Your Home a Haven</h1>
                      <p>
                        Explore curated collection of home decor, get inspired
                        by latest trends and create your unique style
                      </p>
                    </div>
                  </div>

                  <div className="carousel-item">
                    <Image
                      src="/images/hero5.svg"
                      className="d-block w-100"
                      alt="hero-images"
                      width={100}
                      height={100}
                      unoptimized
                    />

                    <div className="contents">
                      <h1>Make Your Home a Haven</h1>
                      <p>
                        Explore curated collection of home decor, get inspired
                        by latest trends and create your unique style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-right">
              <div className="auth-form">
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
                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
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
                    Not a customer? <Link href="/auth/register">Register</Link>
                  </small>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
