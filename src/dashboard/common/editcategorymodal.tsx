import React, { useContext, useEffect, useState } from "react";
import Loading from "@/common/loading";
import "react-phone-number-input/style.css";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import cogoToast from "cogo-toast";
import { singleUpload } from "@/pages/api/utils/singleUpload";
import { PutRequest } from "@/utils/requests";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
//

const EditCategoryModal = ({ editModal, setEditModal, data }) => {
  // const { state, dispatch } = useContext(DataContext);
  const [buttonloading, setButtonloading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [categoryName, setCategoryName] = useState("");
  const [file, setFile] = useState<any>(null);
  const { state, dispatch } = useContext(DataContext);

  // set default data
  useEffect(() => {
    setSelectedImage(data?.image);
    setCategoryName(data?.name);
  }, [data?.image, data?.name]);

  // handle upload
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];

    // acceptable image size 1mb
    if (file?.size > 1024 * 1024) {
      cogoToast.error("Image should not be greater than 1mb");
      return;
    }

    setImageLoading(true);

    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);
    setFile(file);

    let formData = new FormData();
    formData.append("file", file);

    setImageLoading(false);
  };

  // Create category
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    setButtonloading(true);

    // first upload image
    if (file) {
      const image = await singleUpload(file);

      if (image !== null && image !== undefined) {
        const payload = {
          image: image?.url,
          name: categoryName,
        };

        const res = await PutRequest(`/category/${data?._id}`, payload, token);
        if (res?.status === 200) {
          dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
          dispatch({ type: ACTIONS.LOADING, payload: true });
          cogoToast.success(res?.data?.message);
          setEditModal(false);
        } else {
          setButtonloading(false);
        }
      }
    } else {
      const payload = {
        image: selectedImage,
        name: categoryName,
      };

      const res = await PutRequest(`/category/${data?._id}`, payload, token);
      if (res?.status === 200) {
        dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
        dispatch({ type: ACTIONS.LOADING, payload: true });
        cogoToast.success(res?.data?.message);
        setEditModal(false);
      } else {
        setButtonloading(false);
      }
    }
  };

  //

  return (
    <Modal
      show={editModal}
      onHide={() => setEditModal(false)}
      dialogClassName="address-modal"
    >
      <div className="address">
        <div className="row mb-2">
          <div className="col-9">
            <div className="d-flex align-items-center">
              <h6>Edit Category</h6>
            </div>
          </div>

          <div className="col-3">
            <div className="address-cancel float-end">
              <i
                className="bi bi-x-circle"
                onClick={() => {
                  setEditModal(false);
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

                {!selectedImage && <i className="bi bi-image"></i>}
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
              onClick={handleUpdate}
            >
              {buttonloading ? (
                <Loading
                  height="20px"
                  width="20px"
                  primaryColor="#fff"
                  secondaryColor="#fff"
                />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
