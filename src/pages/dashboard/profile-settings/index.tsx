import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Image from "next/image";
import Topbar from "@/dashboard/components/topbar";
import cogoToast from "cogo-toast";
import Loading from "@/common/loading";
import { GetRequests, PatchRequest, PutRequest } from "@/utils/requests";
import { singleUpload } from "@/pages/api/utils/singleUpload";
import { DataContext } from "@/store/GlobalState";
import { ACTIONS } from "@/store/Actions";
//

const Settings = () => {
  const [imageLoading, setImageLoading] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [buttonloading, setButtonloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const { state, dispatch } = useContext(DataContext);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    const getUser = async () => {
      const res = await GetRequests("/user", token);
      if (res?.status === 200 || res?.status === 201) {
        setUser(res?.data);
        setFullname(res?.data?.name);
        setEmail(res?.data?.email);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };
    getUser();
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

    const token = localStorage.getItem("token") || "";

    setImageLoading(true);

    const imageURL = URL.createObjectURL(file);
    setSelectedImage(imageURL);

    const image = await singleUpload(file);

    if (image !== null && image !== undefined) {
      const payload = {
        avatar: image?.url,
      };

      const res = await PatchRequest("/user", payload, token);
      if (res?.status === 200 || res?.status === 201) {
        dispatch({ type: ACTIONS.CALLBACK, payload: !state?.callback });
        cogoToast.success(res?.data?.message);
        localStorage.setItem("avatar", image?.url);
        setImageLoading(false);
      } else {
        setImageLoading(false);
      }
    }

    // let formData = new FormData();
    // formData.append("file", file);
  };

  // handle update
  const handleUpdate = async () => {
    const token = localStorage.getItem("token") || "";

    setButtonloading(true);

    const payload = {
      name: fullname,
    };

    const res = await PutRequest("/user", payload, token);
    if (res?.status === 200 || res?.status === 201) {
      cogoToast.success(res?.data?.message);
      setButtonloading(false);
    } else {
      setButtonloading(false);
    }
  };

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar
          title="Profile Settings"
          subtitle="Update your profile information"
        />

        {loading ? (
          <div
            style={{
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Loading
              primaryColor="#000"
              secondaryColor="#000"
              width="50px"
              height="50px"
            />
            Loading Profile
          </div>
        ) : (
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
                src={selectedImage ? selectedImage : user?.avatar}
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
                  {buttonloading ? (
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
        )}
      </section>
    </DashboardLayout>
  );
};

export default Settings;
