import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../DashboardLayout";
import { data } from "@/constants/data";
import Topbar from "@/dashboard/components/topbar";
import Image from "next/image";

const EditProduct = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    setOrders(data);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Add Product" subtitle="Add new product here" />

        <div className="add-product">
          <div className="information-section">
            <div className="row">
              <div className="col-6">
                <div className="form-div">
                  <label>Title</label>
                  <input type="text" placeholder="" />
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Buying Price</label>
                  <input type="text" placeholder="" />
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Selling Price</label>
                  <input type="text" placeholder="" />
                </div>
              </div>

              <div className="col-6">
                <div className="form-div">
                  <label>Category</label>
                  <input type="text" placeholder="" />
                </div>
              </div>

              <div className="col">
                <div className="form-div">
                  <label>Product Description</label>
                  <textarea placeholder="Product description" />
                </div>
              </div>
            </div>

            <button className="create-button">Create product</button>
          </div>

          <div className="image-section">
            <div className="image-top">
              <div
                id="carouselExampleRide"
                className="carousel slide"
                data-bs-ride="true"
              >
                <div className="carousel-inner">
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

              <button
                className={!loading && orders?.length === 0 ? "py-5" : ""}
              >
                <i className="bi bi-upload"></i>
                Add image for product
              </button>
            </div>

            <div className="image-bottom">
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
            </div>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
};

export default EditProduct;
