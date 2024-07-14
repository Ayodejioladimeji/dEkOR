import React from "react";
import Heading from "./Heading";
import Image from "next/image";

const Categories = () => {
  //
  return (
    <div className="categories">
      <div className="container">
        <Heading title="Categories" />

        <div className="row">
          <div className="col-12 col-sm-4 col-md-4">
            <div className="first-box">
              <Image
                src="/images/category1.svg"
                alt="category-image"
                width={100}
                height={100}
                unoptimized
              />

              <div className="content">Flower vases</div>
            </div>
          </div>

          <div className="col-12 col-sm-8 col-md-8">
            <div className="category-div">
              <div className="image-box">
                <Image
                  src="/images/category2.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Lightning</div>
              </div>
              <div className="image-box">
                <Image
                  src="/images/category3.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Curtains</div>
              </div>

              <div className="image-box">
                <Image
                  src="/images/category4.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Furniture</div>
              </div>
              <div className="image-box">
                <Image
                  src="/images/category5.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Ceramics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
