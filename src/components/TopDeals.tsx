import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRouter } from "next/router";
import { GetRequest } from "@/utils/requests";
import Loading from "@/common/loading";
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_URL;

const TopDeals = () => {
  const router = useRouter();
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //

  useEffect(() => {
    const getProducts = async () => {
      const res: any = await GetRequest(
        `/products?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=9&Appid=${APP_ID}&Apikey=${API_KEY}`
      );

      if (res?.status === 200) {
        setProducts(res?.data.items);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  //
  const countdownDate = new Date();
  countdownDate.setDate(countdownDate.getDate() + 10);
  const [remainingTime, setRemainingTime] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const now = new Date();
    const difference = countdownDate.getTime() - now.getTime();
    return Math.max(0, Math.floor(difference / 1000));
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  });

  // here, i'm converting remainingTime into days, hours, minutes, seconds
  const days = Math.floor(remainingTime / (24 * 60 * 60));
  const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  //
  return (
    <div className="top-deals">
      <div className="container">
        <Heading title="Top Deals For The Day" />

        {loading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Loading
              primaryColor="#000"
              secondaryColor="#000"
              width="50px"
              height="50px"
            />
            Loading Products
          </div>
        ) : (
          <div className="top-deal-container">
            <Swiper
              modules={[Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={1}
              slidesPerView={1}
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
              {products?.slice(0, 15)?.map((item, key) => (
                <SwiperSlide key={key}>
                  <div className="deals">
                    <div className="image-box">
                      <Image
                        height={100}
                        width={100}
                        unoptimized
                        src={IMAGE_URL + "/images/" + item?.photos[0]?.url}
                        alt="images"
                        className="image1"
                      />

                      <div className="discount">-0.5%</div>
                    </div>

                    <h3>{item.name}</h3>
                    <p>$99.5</p>

                    <div className="count-down">
                      <div className="count">
                        <p>{days}</p>
                        <p>Days</p>
                      </div>
                      :
                      <div className="count">
                        <p>{hours}</p>
                        <p>Hours</p>
                      </div>
                      :
                      <div className="count">
                        <p>{minutes}</p>
                        <p>Mins</p>
                      </div>
                      :
                      <div className="count">
                        <p>{seconds}</p>
                        <p>Secs</p>
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/product/${item.id}`)}
                      className="view-all"
                    >
                      View Details
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopDeals;
