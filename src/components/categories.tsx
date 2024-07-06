import CardSkeleton from "@/common/cardskeleton";
import Productcard from "@/common/productcard";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { data } from "@/constants/data";
import Image from "next/image";

interface Props {}

const Categories = (props: Props) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    // to show the product card skeletal loader, i will delay the products
    setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 1000);
  }, []);

  //
  return (
    <div className="categories">
      <div className="container">
        <Heading title="Categories" />

        <div className="row">
          <div className="col-4">
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

          <div className="col-8">
            <div className="category-div">
              <div className="image-box">
                <Image
                  src="/images/category2.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Flower vases</div>
              </div>
              <div className="image-box">
                <Image
                  src="/images/category3.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Flower vases</div>
              </div>

              <div className="image-box">
                <Image
                  src="/images/category4.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Flower vases</div>
              </div>
              <div className="image-box">
                <Image
                  src="/images/category5.svg"
                  alt="category-image"
                  width={100}
                  height={100}
                  unoptimized
                />
                <div className="content">Flower vases</div>
              </div>
            </div>
          </div>
        </div>

        {/* view all button */}
        <button className="view-all">View All</button>
      </div>
    </div>
  );
};

export default Categories;
