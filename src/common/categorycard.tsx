// import { useRouter } from "next/router";
import React from "react";
import { firstTwoWords } from "@/utils/utils";
import Image from "next/image";

//

const Categorycard = (props: any) => {
  const handleRoute = () => {};

  //

  return (
    <>
      <div className="category-card">
        <div className="category-image">
          <Image
            src={props?.image}
            alt="product-image"
            width={100}
            height={100}
            unoptimized
          />

          <button onClick={handleRoute} className="add-to-cart">
            View products
          </button>
        </div>

        <div className="category-content">
          <h3>{firstTwoWords(props?.name)}</h3>
        </div>
      </div>
    </>
  );
};

export default Categorycard;
