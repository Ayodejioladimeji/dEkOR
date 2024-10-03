import React, { useState } from "react";
// import { DataContext } from "@/store/GlobalState";
// import { ACTIONS } from "@/store/Actions";
// import { PostRequest } from "@/utils/requests";
// import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import "react-phone-number-input/style.css";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import cogoToast from "cogo-toast";
//

const CategoryModal = ({ createModal, setCreateModal }) => {
  // const { state, dispatch } = useContext(DataContext);
  const [addressLoading, setAddressLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [categoryName, setCategoryName] = useState("");

  // handle upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    // acceptable image size 1mb
    if (file?.size > 1024 * 1024) {
      cogoToast.error("Image should not be greater than 1mb");
      return;
    }

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      cogoToast.error("Image format not acceptable");
      return;
    }

    setImageLoading(true);

    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);

    let formData = new FormData();
    formData.append("file", file);

    // const newData = {
    //   file: file,
    // };

    setImageLoading(false);

    // try {
    //   const res = await patchDataImages("/user/image-upload", newData, token);
    //   localStorage.setItem("profile-image", res.data.data);
    //   cogoToast.success(res.data.message);
    //   dispatch({ type: ACTIONS.IMAGECALLBACK, payload: !state.imageCallback });
    //   setImageLoading(false);
    // } catch (error) {
    //   console.log(error.response.data);
    //   cogoToast.error(error?.response?.data?.message);
    //   setImageLoading(false);
    // }
  };

  // save address method
  const saveAddress = async (e) => {
    e.preventDefault();
    setAddressLoading(true);

    // const newAddress = {
    //   recipientName: data.recipientName,
    //   city: cityChange?.value,
    //   state: data.state,
    //   street: data.street,
    //   landmark: data.landmark,
    //   houseNumber: data.houseNumber,
    //   additionalInformation: data.additionalInformation,
    //   recipientPhone: data.recipientPhone,
    // };

    // const res = await PostRequest("/user/address", newAddress, token);
    // if (res.status === 200) {
    //   dispatch({
    //     type: ACTIONS.ADDRESSCALLBACK,
    //     payload: !state.addressCallback,
    //   });
    //   cogoToast.success(res.data.message, { hideAfter: 5 });
    //   setOpenModal(false);
    // } else {
    //   setAddressLoading(false);
    // }
  };

  //

  return (
    <Modal
      show={createModal}
      onHide={() => setCreateModal(false)}
      dialogClassName="address-modal"
    >
      <div className="address">
        <div className="row mb-2">
          <div className="col-9">
            <div className="d-flex align-items-center">
              <h6>Add New Category</h6>
            </div>
          </div>

          <div className="col-3">
            <div className="address-cancel float-end">
              <i
                className="bi bi-x-circle"
                onClick={() => {
                  setCreateModal(false);
                }}
              />
            </div>
          </div>
        </div>

        {/* Profile input section */}
        <div className="form-box mt-5">
          <div className="row">
            <div className="col-12">
              <label className="mb-2">Choose Image</label>

              <div className="upload-image my-3">
                <span>
                  {imageLoading ? (
                    <Loading
                      height="25px"
                      width="25px"
                      primaryColor="#fff"
                      secondaryColor="#fff"
                    />
                  ) : (
                    <i className="bi bi-camera"></i>
                  )}

                  <input
                    autoComplete="off"
                    type="file"
                    id="Image"
                    className="file-up"
                    accept="image/*"
                    onChange={handleUpload}
                  />
                </span>

                {selectedImage && (
                  <Image
                    height={100}
                    width={100}
                    src={selectedImage}
                    alt="profile-icon"
                  />
                )}
              </div>
            </div>

            <div className="col-12">
              <label className="mb-2">Title</label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="input form-control"
                placeholder="Enter category name"
              />
            </div>
          </div>

          <div className="profile-btn">
            <button
              disabled={
                categoryName === "" || selectedImage === "" ? true : false
              }
              className="btn"
              onClick={saveAddress}
            >
              {addressLoading ? (
                <Loading
                  height="20px"
                  width="20px"
                  primaryColor="#fff"
                  secondaryColor="#fff"
                />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryModal;
