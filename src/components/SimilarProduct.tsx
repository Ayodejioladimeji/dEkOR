import React, { useEffect, useState } from "react";
import Productcard from "@/common/productcard";
import { GetRequest } from "@/utils/requests";
import CardSkeleton from "@/common/cardskeleton";

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
        const res: any = await GetRequest(`/product?categoryId=${props?.id}`);

        if (res?.status === 200) {
          setProducts(res?.data?.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      };
      getProducts();
    }
  }, [props?.id]);
  //

  if (!loading && products?.length === 0) return null;

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
