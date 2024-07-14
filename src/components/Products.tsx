import CardSkeleton from "@/common/cardskeleton";
import Productcard from "@/common/productcard";
import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import { data } from "@/constants/data";
import { useRouter } from "next/router";
import { GetRequest } from "@/utils/requests";
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {}

const Products = (props: Props) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //

  useEffect(() => {
    const getProducts = async () => {
      const res: any = await GetRequest(
        `?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=9&Appid=${APP_ID}&Apikey=${API_KEY}`
      );

      if (res?.status === 200) {
        setProducts(res?.data.items);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  //
  return (
    <div className="products">
      <div className="container">
        <Heading title="Products" />

        <div className="product-box">
          {loading ? (
            <CardSkeleton length={9} />
          ) : (
            <>
              {products?.map((item: any) => {
                return <Productcard {...item} key={item.id} />;
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
