import CardSkeleton from "@/common/cardskeleton";
import Productcard from "@/common/productcard";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { data } from "@/constants/data";

interface Props {}

const Products = (props: Props) => {
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
    <div className="products">
      <div className="container">
        <Heading title="Products" />

        <div className="product-box">
          {loading ? (
            <CardSkeleton length={8} />
          ) : (
            <>
              {products?.map((item: any) => {
                return <Productcard {...item} />;
              })}
            </>
          )}
        </div>

        {/* view all button */}
        <button className="view-all">View All</button>
      </div>
    </div>
  );
};

export default Products;
