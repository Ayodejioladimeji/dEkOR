import React from "react";
import Heading from "./Heading";
import { data } from "@/constants/data";
import Productcard from "@/common/productcard";

interface Props {}

const SimilarProduct = (props: Props) => {
  //

  return (
    <div className="similar-product">
      <h1>Similar Product in this category</h1>

      <div className="product-box">
        {data?.slice(0, 4)?.map((item: any) => {
          return <Productcard {...item} key={item.id} />;
        })}
      </div>
    </div>
  );
};

export default SimilarProduct;
