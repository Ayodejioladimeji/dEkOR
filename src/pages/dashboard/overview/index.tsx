import React from "react";
import DashboardLayout from "../DashboardLayout";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRouter } from "next/router";
import Topbar from "@/dashboard/components/topbar";

const Overview = () => {
  const router = useRouter();

  // responsive slider on smaller devices
  let settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1233,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1053,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Overview" subtitle="View your dashboard metrics" />

        <div className="overview">
          <div className="summary">
            <div className="row p-2">
              <Slider {...settings}>
                <div className="col columns">
                  <div className="card" onClick={() => router.push("/orders")}>
                    <p>Total Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">{0}</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div
                    className="card"
                    onClick={() => router.push(`/order/delivered-orders`)}
                  >
                    <p>Delivered Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">{0}</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div
                    className="card"
                    onClick={() => router.push(`/order/ongoing-orders`)}
                  >
                    <p>Pending Orders</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0">{0}</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns">
                  <div
                    className="card"
                    onClick={() => router.push(`/order/processing-orders`)}
                  >
                    <p>Transactions</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0"> {0}</h4>
                    </div>
                  </div>
                </div>

                <div className="col columns last-column">
                  <div
                    className="card"
                    onClick={() => router.push(`/order/scheduled-orders`)}
                  >
                    <p>Addresses</p>
                    <div className="d-flex align-items-end justify-content-between">
                      <h4 className="mb-0"> {0}</h4>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default Overview;
