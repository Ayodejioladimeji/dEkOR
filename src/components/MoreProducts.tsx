import React, { useEffect, useState } from "react";
import Productcard from "@/common/productcard";
import { GetRequest } from "@/utils/requests";
import CardSkeleton from "@/common/cardskeleton";

const MoreProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const res: any = await GetRequest(`/product`);

      if (res?.status === 200) {
        setProducts(res?.data?.products);
      }
      setLoading(false);
    };
    getProducts();
  }, []);
  //

  if (!loading && products?.length === 0) return null;

  return (
    <div className="similar-product">
      <h1>You Can Check Out Similar Products</h1>

      <div className="product-box">
        {loading ? (
          <CardSkeleton length={4} />
        ) : (
          <>
            {products?.map((item: any) => {
              return <Productcard {...item} key={item._id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MoreProduct;
