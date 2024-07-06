import Breadcumb from "@/common/breadcumb";
import Loading from "@/common/loading";
import Layout from "@/components/Layout";
import { data } from "@/constants/data";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Props {}

const Product = (props: Props) => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(true);

  //  get detail product
  useEffect(() => {
    if (slug) {
      data?.forEach((item) => {
        if (item.id === slug) {
          setProduct(item);
        }
      });
      setLoading(false);
    }
  }, [slug]);

  //

  return (
    <Layout>
      <div className="product-details">
        {loading ? (
          <div className="loading">
            <Loading
              primaryColor="#000"
              secondaryColor="#000"
              width="50px"
              height="50px"
            />
          </div>
        ) : (
          <div className="container">
            <div className="heading-section">
              <Breadcumb title={product?.title} />
            </div>

            <div className="content">
              <div className="row">
                <div className="col">
                  <Image
                    src={product?.images[0]}
                    alt="product-image"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="col">right</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Product;
