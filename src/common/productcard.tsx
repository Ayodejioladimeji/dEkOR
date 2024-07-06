import React from "react";
import { Image } from "react-bootstrap";

interface Props {}

const Productcard = (props: Props) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <Image src="" alt="product-image" width={100} height={100} />
      </div>

      <div className="product-content">
        <h3>Title of the product</h3>
      </div>
    </div>
  );
};

export default Productcard;
