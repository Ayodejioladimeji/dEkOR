import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Image from "next/image";
import { GetRequest } from "@/utils/requests";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";


const EditProduct = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>([]);
  const router = useRouter()
  const {slug} = router.query
  const {state} = useContext(DataContext)
  const [title, setTitle] = useState("")
  const [buyingPrice, setBuyingPrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState<any>([])
  const [selectloading, setSelectloading] = useState(true)

  // 

  // fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await GetRequest("/category")
      if (res?.status === 200) {
        setCategories(res?.data)
        setSelectloading(false)
      }
    }
    getCategories()
  }, [])

  useEffect(() => {
    if(slug){
      const getProducts = async () => {
        const res = await GetRequest(`/product/${slug}`)
        if (res?.status === 200) {
          setProduct(res?.data)
          setTitle(res?.data?.title)
          setBuyingPrice(res?.data?.buyingPrice)
          setSellingPrice(res?.data?.sellingPrice)
          setCategory(res?.data?.category)
          setDescription(res?.data?.description)
          setLoading(false);
        }
        else {
          setLoading(false)
        }
      }

      getProducts()
    }

  }, [state?.callback, slug]);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Edit Product" subtitle="Edit single product here" />

        <div className="add-product">
          <div className="information-section">
            <div className="row">
              <div className="col-6">
                <div className="form-div">
                  <label>Title</label>
                  <input type="text" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Buying Price</label>
                  <input type="text" placeholder="" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)}/>
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Selling Price</label>
                  <input type="text" placeholder="" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}/>
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Category</label>
                  <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories?.map((item:any, index:number) => (
                      <option key={index} value={item?._id}>{item?.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="form-div">
                  <label>Product Description</label>
                  <textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
              </div>
            </div>

            <button className="create-button">Update product</button>
          </div>

          <div className="image-section">
            <div className="image-top">
              <div
                id="carouselExampleRide"
                className="carousel slide"
                data-bs-ride="true"
              >
                {/* <div className="carousel-inner">
                  {orders?.slice(0, 5)?.map((item: any, index: number) => (
                    <div
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                      key={index}
                    >
                      <Image
                        src={item?.images[0]}
                        className="d-block w-100"
                        alt="Order Image"
                        width={100}
                        height={100}
                      />
                    </div>
                  ))}
                </div> */}

                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleRide"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleRide"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              {/* <button
                className={!loading && orders?.length === 0 ? "py-5" : ""}
              >
                <i className="bi bi-upload"></i>
                Add image for product
              </button> */}
            </div>

            {/* <div className="image-bottom">
              {!loading && orders?.length === 0 ? (
                <div className="empty-images py-5">
                  <i className="bi bi-images"></i>Uploaded images will show here
                </div>
              ) : (
                <>
                  <div className="show-images">
                    {orders?.slice(0, 5)?.map((item: any, index: number) => (
                      <div className="image-bottom-box" key={index}>
                        <Image
                          src={item?.images[0]}
                          className="d-block w-100"
                          alt="..."
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="button-container">
                    <button>Save images</button>
                  </div>
                </>
              )}
            </div> */}
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default EditProduct;
