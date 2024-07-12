import React, { useEffect, useState } from "react";
import Breadcumb from "../../common/breadcumb";
import Layout from "../../components/Layout";
import CardSkeleton from "../../common/cardskeleton";
import { data } from "../../constants/data";
import Productcard from "../../common/productcard";
import { FilterIcon } from "../../../public/assets";
import Paginate from "@/components/pagination/Paginate";
import { useRouter } from "next/router";
import { GetRequest } from "@/utils/requests";
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Props {}

const AllProducts = (props: Props) => {
  const [products, setProducts] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const PageSize = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const router = useRouter();
  const { page } = router.query;

  //
  // useEffect(() => {
  //   // to show the product card skeletal loader, i will delay the products
  //   setTimeout(() => {
  //     setProducts(data);
  //     setTotalCount(data?.length);
  //     setLoading(false);
  //   }, 1000);
  // }, [router]);

  useEffect(() => {
    const getProducts = async () => {
      const res: any = await GetRequest(
        `/products?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=${
          page === undefined ? currentPage : page
        }&size=${PageSize}&Appid=${APP_ID}&Apikey=${API_KEY}`
      );
      console.log(res?.data?.items);
      setProducts(res?.data.items);
    };
    setLoading(false);
    getProducts();
  }, []);

  const currentProducts = products?.slice(
    (currentPage - 1) * PageSize,
    currentPage * PageSize
  );

  //

  return (
    <Layout>
      <div className="all-products">
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
              <CardSkeleton length={12} />
            ) : (
              <>
                {products?.map((item: any) => {
                  return <Productcard {...item} key={item.id} />;
                })}
              </>
            )}
          </div>

          {/* pagination */}
          {!loading && products?.length !== 0 && totalCount > PageSize && (
            <div className="page-navigation">
              <div className="mt-3">
                <Paginate
                  className="pagination-bar"
                  currentPage={
                    !loading && page === undefined ? currentPage : Number(page)
                  }
                  totalCount={totalCount}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                  loading={loading}
                  setLoading={setLoading}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
