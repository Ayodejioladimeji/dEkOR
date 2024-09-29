import React, { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Image from "next/image";
import Topbar from "@/dashboard/components/topbar";
import cogoToast from "cogo-toast";
import Loading from "@/common/loading";

const Settings = () => {
  // const [profileImage, setProfileImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmail("");
    setLoading(false);
  }, []);

  // Change profile avatar method
  const handleAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // handle update
  const handleUpdate = () => {};

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar
          title="Profile Settings"
          subtitle="Update your profile information"
        />

        <div className="settings">
          <div className="profile-image my-3">
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
                onChange={handleAvatar}
              />
            </span>

            <Image
              height={100}
              width={100}
              src="/images/profile-image.png"
              alt="profile-icon"
            />
          </div>

          {/* Profile input section  */}
          <div className="form-box">
            <div className="row mb-2 mb-md-4">
              <div className="col-12">
                <label className="mb-1">FullName</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input form-control"
                  placeholder="Enter fullname"
                  aria-label="First name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-2 mb-md-4">
              <div className="col-12">
                <label className="mb-1">Email Address</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="input form-control"
                  placeholder=""
                  aria-label="email"
                  value={email}
                  name="email"
                  disabled
                />
              </div>
            </div>

            <div className="profile-btn">
              <button className="btn" onClick={handleUpdate}>
                {loading ? (
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
      </section>
    </DashboardLayout>
  );
};

export default Settings;
