import React, { useEffect, useState } from "react";
import Productcard from "@/common/productcard";
import { GetRequest } from "@/utils/requests";
import CardSkeleton from "@/common/cardskeleton";
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {
  id?: string;
}

const SimilarProduct = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    // No endpoint to get item with category id

    if (props?.id) {
      const getProducts = async () => {
        const res: any = await GetRequest(
          `?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=40&Appid=${APP_ID}&Apikey=${API_KEY}`
        );

        if (res?.status === 200) {
          const filtered = res?.data?.items?.filter(
            (item: any) => item?.categories[0]?.id === props?.id
          );

          if (props?.id) {
            setProducts(filtered);
          } else {
            setProducts(res?.data?.items);
          }
          setLoading(false);
        }
      };
      getProducts();
    }
  }, [props?.id]);
  //

  return (
    <div className="similar-product">
      <h1>Similar Product in this category</h1>

      <div className="product-box">
        {loading ? (
          <CardSkeleton length={4} />
        ) : (
          <>
            {products?.slice(0, 8)?.map((item: any) => {
              return <Productcard {...item} key={item.id} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SimilarProduct;
