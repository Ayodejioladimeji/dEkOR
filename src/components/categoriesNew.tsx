import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetRequest } from '@/utils/requests';
const ORGANISATION_ID = process.env.NEXT_PUBLIC_ORGANISATION_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL


interface Props {}

const CategoriesNew = (props: Props) => {

  const [categories, setCategories] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  //

  useEffect(() => {
    const getProducts = async () => {
      const res: any = await GetRequest(
        `/categories?organization_id=${ORGANISATION_ID}&reverse_sort=false&page=1&size=9&Appid=${APP_ID}&Apikey=${API_KEY}`
      );

      if (res?.status === 200) {
        setCategories(res?.data.items);
      }
      setLoading(false);
    };
    getProducts();
  }, []);

  const firstCategory = categories?.find((_, index) => index === 0)

  //
  return (
    <div className="categories">
      <div className="container">
        <Heading title="Categories" />

        <div className="row">
          <div className="col-12 col-sm-4 col-md-4">
            {loading ? <div className="first-box">
              <Skeletons style="single-image"/>
            </div>
            :

            <div className="first-box">
              <Image
                src={BASE_URL + "/images/" + firstCategory?.photos[0]?.url}
                alt="category-image"
                width={100}
                height={100}
                unoptimized
              />

              <div className="content">{firstCategory?.name}</div>
            </div>
          }
          </div>

          <div className="col-12 col-sm-8 col-md-8">
            <div className="category-div">
{loading ? <>
                <div className="image-box">
                  <Skeletons style="multiple-image" />
                </div>
                <div className="image-box">
                  <Skeletons style="multiple-image" />
                </div>
                <div className="image-box">
                  <Skeletons style="multiple-image" />
                </div>
                <div className="image-box">
                  <Skeletons style="multiple-image" />
                </div>
</>
            :
              <>
              {categories?.slice(1, 4)?.map(item => {
                return(
                  <div className="image-box">
                    <Image
                      src={BASE_URL + "/images/" + item?.photos[0]?.url}
                      alt="category-image"
                      width={100}
                      height={100}
                      unoptimized
                    />
                    <div className="content">{item?.name}</div>
                  </div>
                )
              })}
              </>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesNew;
