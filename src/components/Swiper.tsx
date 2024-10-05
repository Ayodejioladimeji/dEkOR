import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/constants/testimonials";

const SwiperComponent = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={(item) => console.log(item.realIndex)}
      className="custom-swiper-navigation"
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        },
      }}
    >
      {testimonials?.map((item, key) => (
        <SwiperSlide key={key}>
          <TestimonialCard {...item} index={key} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
