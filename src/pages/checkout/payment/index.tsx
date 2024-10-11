import Loading from "@/common/loading";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MetaTags from "@/components/meta-tags";
import { GetRequests } from "@/utils/requests";

//

const InitializePayment = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const reference = router.query.reference;
  const [status, setStatus] = useState(null);

  //

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    if (reference) {
      const verifyTransaction = async () => {
        const res = await GetRequests(
          `/orders/verify-payment?reference=${reference}`,
          token
        );

        if (res?.status === 200 || res?.status === 201) {
          setStatus(200);
          setLoading(false);
        } else {
          setStatus(400);
        }
      };
      verifyTransaction();
    }
  }, [router, reference]);

  if (loading || !status || status === 400) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "80px",
          flexDirection: "column",
        }}
      >
        <Loading
          height="55px"
          width="55px"
          primaryColor="#27493e"
          secondaryColor="#27493e"
        />
        <h2>Please wait...</h2>
      </div>
    );
  }

  return (
    <>
      <MetaTags title="Confirm payment" description="Confirm your payment" />

      <div className="container-fluid">
        <div className="activate payment">
          <div className="payment-success">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="30" fill="#12B76A" />
              <path
                d="M26.1538 38.1686L18.2319 30.814C17.756 30.3722 17.756 29.6558 18.2319 29.2139L19.9555 27.6137C20.4314 27.1718 21.2031 27.1718 21.6791 27.6137L27.0156 32.5681L38.4459 21.9564C38.9219 21.5145 39.6936 21.5145 40.1695 21.9564L41.8931 23.5565C42.369 23.9984 42.369 24.7148 41.8931 25.1567L27.8774 38.1686C27.4014 38.6105 26.6298 38.6105 26.1538 38.1686Z"
                fill="#FDFDFE"
              />
            </svg>

            <h3>Congratulations 🎉</h3>
            <p>
              Your payment was successful proceed to your dashboard to view your
              order
            </p>

            <div className="button-container">
              <button onClick={() => router.push("/dashboard/orders")}>
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InitializePayment;
