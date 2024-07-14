import React, { useEffect, useState } from "react";
import Productcard from "@/common/productcard";
import { GetRequest } from "@/utils/requests";
import CardSkeleton from "@/common/cardskeleton";
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {}

const MoreProduct = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // No endpoint to get item with category id

    const getProducts = async () => {
      const res: any = await GetRequest(
        `/products?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=4&Appid=${APP_ID}&Apikey=${API_KEY}`
      );

      if (res?.status === 200) {
        setProducts(res?.data?.items);
      }
      setLoading(false);
    };
    getProducts();
  }, []);
  //

  return (
    <div className="similar-product">
      <h1>You Can Check Out Similar Products</h1>

      <div className="product-box">
        {loading ? (
          <CardSkeleton length={4} />
        ) : (
          <>
            {products?.map((item: any) => {
              return <Productcard {...item} key={item.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MoreProduct;
