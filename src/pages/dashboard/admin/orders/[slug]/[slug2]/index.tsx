import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../../../../DashboardLayout";
import Topbar from "@/dashboard/components/topbar";
import Image from "next/image";
import { GetRequest, GetRequests, PatchRequest } from "@/utils/requests";
import { useRouter } from "next/router";
import { DataContext } from "@/store/GlobalState";
import Loading from "@/common/loading";
import { formatMoney } from "@/utils/utils";
import ConfirmModal from "@/dashboard/common/confirmmodal";
import cogoToast from "cogo-toast";
import { ACTIONS } from "@/store/Actions";
import moment from "moment";

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { slug, slug2 } = router.query;
  const { state, dispatch } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [data, setData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [deliverloading, setDeliverloading] = useState(false);

  // Fetch product data by slug
  useEffect(() => {
    if (slug) {
      const token = localStorage.getItem("token") || "";

      const getProduct = async () => {
        const res = await GetRequests(
          `/orders/admin/${slug}?productId=${slug2}`,
          token
        );
        const response = await GetRequest("/category");

        if (res?.status === 200 || res?.status === 201) {
          const data = res?.data;
          setTitle(data?.product?.title);
          setSellingPrice(data?.product?.sellingPrice);
          setDescription(data?.product?.description);
          setSelectedImages(data?.product?.images);
          setData(data);

          if (response?.status === 200) {
            const result = response?.data?.data?.find(
              (item: any) => item._id === data?.product?.category
            );

            setCategory(result?.name);
          }
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [slug, slug2, state?.callback]);

  // handle deliver
  const handleDeliver = async () => {
    const token = localStorage.getItem("token") || "";

    setDeliverloading(true);

    const res = await PatchRequest(
      `/orders/admin/${slug}?productId=${slug2}`,
      "",
      token
    );
    if (res?.status === 200 || res?.status === 201) {
      dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
      cogoToast.success(res?.data?.message);
      setConfirm(false);
      setDeliverloading(false);
    }
  };

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar
          title="Order Details"
          subtitle="View single order details"
          goback
        />

        <div className="add-product">
          <div className="information-section">
            {loading ? (
              <div
                className="d-flex justify-content-center my-5"
                style={{ height: "50vh" }}
              >
                <Loading
                  height="40px"
                  width="40px"
                  primaryColor="#27493e"
                  secondaryColor="#27493e"
                />
              </div>
            ) : (
              <>
                <div className="row">
                  <div className="order-details">
                    <p>Payment Status</p>
                    <p
                      className="response text-white"
                      style={{
                        background:
                          data?.paymentStatus === "paid" ? "green" : "orange",
                        padding: "1px 15px",
                        borderRadius: "4px",
                        fontSize: "14px",
                      }}
                    >
                      {data?.paymentStatus === "paid"
                        ? "Success"
                        : "Pending Payment"}
                    </p>
                  </div>
                  <div className="order-details">
                    <p>Delivery Status</p>
                    <p
                      className="response"
                      style={{
                        color:
                          data?.product?.orderStatus === "pending-delivery"
                            ? "orange"
                            : "green",
                      }}
                    >
                      {data?.product?.orderStatus}
                    </p>
                  </div>
                  <div className="order-details">
                    <p>Reference</p>
                    <p
                      className="response"
                      style={{ textTransform: "uppercase" }}
                    >
                      {data?.paymentReference}
                    </p>
                  </div>
                  <div className="order-details">
                    <p>Order Date</p>
                    <p className="response">
                      {moment(data?.orderDate).format("lll")}
                    </p>
                  </div>
                  <div className="order-details">
                    <p>Quantity</p>
                    <p className="response">{data?.product?.quantity}</p>
                  </div>
                  <div className="order-details">
                    <p>Order Count</p>
                    <p className="response">
                      {data?.orderCount}{" "}
                      {data?.orderCount > 1 ? "Orders" : "order"}
                    </p>
                  </div>
                  <div className="order-details">
                    <p>Amount Paid</p>
                    <p className="response fw-bold">
                      ₦{formatMoney(Number(data?.totalAmount))}
                    </p>
                  </div>

                  <div className="order-details">
                    <p>Color</p>
                    <p
                      style={{
                        height: "20px",
                        width: "100px",
                        background: data?.product?.selectedColor,
                        border: "1px solid #eaeaea",
                      }}
                    ></p>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <h2>Product Section</h2>

                  <div className="col-12">
                    <div className="form-div">
                      <label>Title</label>
                      <input
                        type="text"
                        placeholder=""
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-div">
                      <label>Selling Price</label>
                      <input
                        type="text"
                        placeholder=""
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="form-div">
                      <label>Category</label>
                      <input
                        type="text"
                        placeholder=""
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col">
                    <div className="form-div">
                      <label>Product Description</label>
                      <textarea
                        placeholder="Product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {data?.paymentStatus === "paid" && (
                  <>
                    <hr />

                    <div className="row">
                      <h2>Shipping Address</h2>

                      <div className="col-6">
                        <div className="form-div">
                          <label>Name</label>
                          <input
                            type="text"
                            placeholder=""
                            value={data?.shippingAddress?.name}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-div">
                          <label>Phone</label>
                          <input
                            type="text"
                            placeholder=""
                            value={data?.shippingAddress?.phone}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="form-div">
                          <label>Address</label>
                          <input
                            type="text"
                            placeholder=""
                            value={data?.shippingAddress?.address}
                            disabled
                          />
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="form-div">
                          <label>City</label>
                          <input
                            type="text"
                            placeholder=""
                            value={data?.shippingAddress?.city}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="form-div">
                          <label>Region</label>
                          <input
                            type="text"
                            placeholder=""
                            value={data?.shippingAddress?.region}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="image-section">
            {data?.paymentStatus === "paid" &&
              data?.product?.orderStatus !== "delivered" && (
                <div className="deliver-section">
                  <button onClick={() => setConfirm(true)}>
                    Deliver Order
                  </button>
                </div>
              )}

            <div className="image-top">
              {loading ? (
                <div className="d-flex justify-content-center my-5">
                  <Loading
                    height="30px"
                    width="30px"
                    primaryColor="#27493e"
                    secondaryColor="#27493e"
                  />
                </div>
              ) : (
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
              )}
            </div>

            {!loading && (
              <div className="user-profile">
                <h2>User Information</h2>

                <div className="user-image mb-4">
                  <Image
                    src={data?.user?.avatar}
                    alt="avatar"
                    width={100}
                    height={100}
                  />
                </div>

                <div className="col-12">
                  <div className="form-div">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder=""
                      value={data?.user?.name}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-div">
                    <label>Email</label>
                    <input
                      type="text"
                      placeholder=""
                      value={data?.user?.email}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {confirm && (
          <ConfirmModal
            title="Deliver Order"
            subtitle="Are you sure you want to mark this order as delivered?"
            buttonTitle="Deliver"
            buttonColor="black"
            onSubmit={handleDeliver}
            loading={deliverloading}
            setConfirmModal={setConfirm}
            confirmModal={confirm}
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default OrderDetails;
