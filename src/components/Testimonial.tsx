import React from "react";
import Heading from "./Heading";
import SwiperComponent from "./Swiper";

const Testimonial = () => {
  //
  return (
    <div className="testimonial">
      <div className="container">
        <Heading
          title="Hear from Our Happy Customers"
          text="Discover what our customers have to say about their experiences shopping with us. We take pride in providing high-quality products and exceptional service, and nothing makes us happier than hearing from satisfied customers like you."
        />

        <SwiperComponent />
      </div>
    </div>
  );
};

export default Testimonial;
