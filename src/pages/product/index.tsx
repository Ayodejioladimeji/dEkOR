import React, { useEffect, useState } from "react";
import Breadcumb from "../../common/breadcumb";
import Layout from "../../components/Layout";
import CardSkeleton from "../../common/cardskeleton";
import { data } from "../../constants/data";
import Productcard from "../../common/productcard";
import { FilterIcon } from "../../../public/assets";

interface Props {}

const AllProducts = (props: Props) => {
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
    <Layout>
      <div className="products">
        <div className="container">
          <div className="heading-section">
            <Breadcumb title="All Products" />
          </div>

          <div className="filter">
            <p>Filter</p>
            <FilterIcon />
          </div>

          <div className="product-box">
            {loading ? (
              <CardSkeleton length={8} />
            ) : (
              <>
                {products?.map((item: any) => {
                  return <Productcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
