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
      spaceBetween={1} // Adjusted spacing between slides
      slidesPerView={1} // Default slides to show
      navigation
      pagination={{ clickable: true }}
      onSlideChange={(item) => console.log(item.realIndex)}
      breakpoints={{
        // when window width is >= 640px
        640: {
          slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
        },
        // when window width is >= 1024px
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
