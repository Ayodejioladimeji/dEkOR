import CardSkeleton from "@/common/cardskeleton";
import Productcard from "@/common/productcard";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { useRouter } from "next/router";
import { GetRequest } from "@/utils/requests";

const Products = () => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //

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

  if (!loading && products?.length <= 1) return null;

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
                return <Productcard {...item} key={item._id} />;
              })}
            </>
          )}
        </div>

        {/* view all button */}
        <button onClick={() => router.push("/product")} className="view-all">
          View All
        </button>
      </div>
    </div>
  );
};

export default Products;
