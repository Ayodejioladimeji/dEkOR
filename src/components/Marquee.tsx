import React from "react";

const Marquee = () => {
  return (
    <div className="marquee">
      <div className="container">
        {/* @ts-ignore */}
        <marquee>
          CHECK OUT OUR TOP DEALS FOR THE DAY!!!! 5% DISCOUNT FOR ALL SPECIFIED
          PRODUCT!!!!
          {/* @ts-ignore */}
        </marquee>
      </div>
    </div>
  );
};

export default Marquee;
