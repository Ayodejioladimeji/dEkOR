import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { data } from "@/constants/data";
import { LeftArrow, RightArrow } from "../../public/assets";

interface Props {}

const TopDeals = (props: Props) => {
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 10); // 10 days from now

  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = countdownDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(difference / 1000)); // in seconds, ensure it doesn't go negative
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert remainingTime into days, hours, minutes, seconds
  const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  //
  return (
    <div className="top-deals">
      <div className="container">
        <Heading title="Top Deals For The Day" />

        <div className="top-deal-container">
          <Swiper
            // Install Swiper modules
            modules={[Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={1}
            slidesPerView={1}
            // pagination={{ clickable: false }}
            onSwiper={(swiper) => console.log("")}
            // onSlideChange={(item) => console.log(item.realIndex)}
            autoplay={{
              delay: 13500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={3000}
            navigation={{
              nextEl: ".image-swiper-button-next",
              prevEl: ".image-swiper-button-prev",
              disabledClass: "swiper-button-disabled",
            }}
          >
            {data?.map((item, key) => (
              <SwiperSlide key={key}>
                <div className="deals">
                  <div className="image-box">
                    <Image
                      height={100}
                      width={100}
                      unoptimized
                      src={item.images[0]}
                      alt="images"
                      className="image1"
                    />

                    <div className="discount">-0.5%</div>
                  </div>

                  <h3>{item.title}</h3>
                  <p>$99.5</p>

                  <div className="count-down">
                    <div className="count">
                      {days} <br /> Days
                    </div>
                    :
                    <div className="count">
                      {hours} <br /> Hours
                    </div>
                    :
                    <div className="count">
                      {minutes} <br /> Mins
                    </div>
                    :
                    <div className="count">
                      {seconds} <br /> Secs
                    </div>
                  </div>

                  <button className="view-all">View Details</button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="left-arrow">
            <LeftArrow />
          </div>

          <div className="right-arrow image-swiper-button-next">
            <RightArrow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
