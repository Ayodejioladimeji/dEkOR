import CardSkeleton from "@/common/cardskeleton";
import Productcard from "@/common/productcard";
import { Product } from "@/typings/typings";
import React, { useEffect, useState } from "react";

interface Props {}

const Products = (props: Props) => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  //
  useEffect(() => {
    const product: any = Array.from({ length: 8 }, (_, index) => ({
      key: String(index),
      value: `Item ${index + 1}`,
    }));
    setProducts(product);
    setLoading(false);
  }, []);

  //
  return (
    <div className="container">
      <div className="products">
        <header>
          <h1>Products</h1>
        </header>

        <div className="product-box">
          {!loading ? (
            <CardSkeleton length={8} />
          ) : (
            <>
              {products?.map((item) => {
                return <Productcard />;
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
