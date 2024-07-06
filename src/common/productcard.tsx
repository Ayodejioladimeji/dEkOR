import React from "react";
import { Image } from "react-bootstrap";

interface Props {
  title: string;
  price: string;
  images: string[];
}

const Productcard = (props: Props) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image
          src={props?.images[0]}
          alt="product-image"
          width={100}
          height={100}
        />
      </div>

      <div className="product-content">
        <h3>{props?.title}</h3>
        <p>${props?.price}</p>
        <button>Shop Now</button>
      </div>
    </div>
  );
};

export default Productcard;
