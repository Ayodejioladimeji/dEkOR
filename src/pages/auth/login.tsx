import React from "react";
import { Formik } from "formik";
import * as EmailValidator from "email-validator";

// COMPONENTS
import Link from "next/link";
// import { useRouter } from "next/router";
// import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import Goback from "@/common/Goback";

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
              <div className="back">
                <Goback />
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
