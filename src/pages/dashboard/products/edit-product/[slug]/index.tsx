import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Image from "next/image";
import { GetRequest, PatchRequest, PutRequest } from "@/utils/requests";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";
import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import { imageUpload } from "@/pages/api/utils/imageUpload";


const EditProduct = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>([]);
  const router = useRouter()
  const { slug } = router.query
  const { state } = useContext(DataContext)
  const [title, setTitle] = useState("")
  const [buyingPrice, setBuyingPrice] = useState("")
  const [sellingPrice, setSellingPrice] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [categories, setCategories] = useState<any>([])
  const [buttonloading, setButtonloading] = useState(false)
  const [imageloading, setImageloading] = useState(false)

  // 

  // fetch categories
  useEffect(() => {
    const getCategories = async () => {
      const res = await GetRequest("/category")
      if (res?.status === 200) {
        setCategories(res?.data)
      }
    }
    getCategories()
  }, [])

  useEffect(() => {
    if (slug) {
      const getProducts = async () => {
        const res = await GetRequest(`/product/${slug}`)
        if (res?.status === 200) {
          setProduct(res?.data)
          setTitle(res?.data?.title)
          setBuyingPrice(res?.data?.buyingPrice)
          setSellingPrice(res?.data?.sellingPrice)
          setCategory(res?.data?.category)
          setDescription(res?.data?.description)
          setSelectedImages(res?.data?.images)
          setLoading(false);
        }
        else {
          setLoading(false)
        }
      }

      getProducts()
    }

  }, [state?.callback, slug]);

  // update product
  const handleUpdate = async () => {
    const token = localStorage.getItem("token") || ""

    setButtonloading(true)

    const payload = {
      title,
      buyingPrice,
      sellingPrice,
      category,
      description
    }

    const res = await PutRequest(`/product/${slug}`, payload, token)
    if (res?.status === 200 || res?.status === 201) {
      cogoToast.success(res?.data?.message)
      setButtonloading(false)
    }
    else {
      setButtonloading(false)
    }
  }

  const [selectedImages, setSelectedImages] = useState<any>([]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            newImages.push(reader.result as string);
            setSelectedImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  // handle submit images
  const handleAddImages = async () => {
    const token = localStorage.getItem("token") || ""

    setImageloading(true)

    // first upload images
    const imgs = await imageUpload(selectedImages)

    if (imgs !== null && imgs !== undefined){

      const payload = {
        productId: slug,
        images: imgs?.map(item => item.url)
      }

      console.log(payload)
  
      const res = await PatchRequest(`/product`, payload, token)
      if (res?.status === 200 || res?.status === 201) {
        cogoToast.success(res?.data?.message)
        setImageloading(false)
      }
      else {
        setImageloading(false)
      }
    }

  }

  // Function to remove image from the selected images array
  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };


  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Edit Product" subtitle="Edit single product here" goback />

        <div className="add-product">

            <div className="information-section">
          {loading ?
            <div className="d-flex justify-content-center my-5">
              <Loading
                height="30px"
                width="30px"
                primaryColor="#27493e"
                secondaryColor="#27493e"
              />
            </div>

            :

              <>    
              <div className="row">
                <div className="col-6">
                  <div className="form-div">
                    <label>Title</label>
                    <input type="text" placeholder="" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-div">
                    <label>Buying Price</label>
                    <input type="text" placeholder="" value={buyingPrice} onChange={(e) => setBuyingPrice(e.target.value)} />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-div">
                    <label>Selling Price</label>
                    <input type="text" placeholder="" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} />
                  </div>
                </div>

                <div className="col-6">
                  <div className="form-div">
                    <label>Category</label>
                    <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                      {categories?.map((item: any, index: number) => (
                        <option key={index} value={item?._id}>{item?.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-div">
                    <label>Product Description</label>
                    <textarea placeholder="Product description" value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                </div>
              </div>

              <button className="create-button" onClick={handleUpdate}>
                {buttonloading ? (
                  <>
                    Updating
                    <Loading
                      height="20px"
                      width="20px"
                      primaryColor="#fff"
                      secondaryColor="#fff"
                    />
                  </>
                ) : (
                  "Update"
                )}

              </button>
              </>
            }
            </div>

          <div className="image-section">
            <div className="image-top">

              {loading ?
                <div className="d-flex justify-content-center my-5">
                  <Loading
                    height="30px"
                    width="30px"
                    primaryColor="#27493e"
                    secondaryColor="#27493e"
                  />
                </div>

                :

                <div
                  id="carouselExampleRide"
                  className="carousel slide"
                  data-bs-ride="true"
                >
                  <div className="carousel-inner">
                    {selectedImages?.map((item: any, index: number) => (
                      <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                      >
                        <Image
                          src={item}
                          className="d-block w-100"
                          alt="Order Image"
                          width={100}
                          height={100}
                        />
                      </div>
                    ))}
                  </div>

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
              }


              {selectedImages?.length <= 5 && <button className={!loading && selectedImages?.length === 0 ? "py-5" : ""}>
                <i className="bi bi-upload"></i>
                Add image for product
              </button>}


              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="file-up"
              />
            </div>


            <div className="image-bottom">
              {loading ?
                <div className="d-flex justify-content-center my-5">
                  <Loading
                    height="30px"
                    width="30px"
                    primaryColor="#27493e"
                    secondaryColor="#27493e"
                  />
                </div>

                :

                <>

                  {selectedImages?.length === 0 || !selectedImages ? (
                    <div className="empty-images py-5">
                      <i className="bi bi-images"></i>Uploaded images will show here
                    </div>
                  ) : (
                    <>
                      <div className="show-images">
                        {selectedImages.map((image, index) => (
                          <div className="image-bottom-box" key={index}>
                            <Image
                              src={image}
                              className="d-block w-100"
                              alt="Selected Image"
                              width={100}
                              height={100}
                            />

                            <i className="bi bi-dash-circle-fill" onClick={() => handleRemoveImage(index)}></i>
                          </div>
                        ))}
                      </div>

                      <div className="button-container">
                        <button onClick={handleAddImages} disabled={selectedImages?.length <= 1 ? true : false}>
                          {imageloading ? (
                            <>
                              Uploading
                              <Loading
                                height="20px"
                                width="20px"
                                primaryColor="#fff"
                                secondaryColor="#fff"
                              />
                            </>
                          ) : (
                            "Save images"
                          )}

                        </button>
                      </div>
                    </>
                  )}
                </>
              }
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default EditProduct;
