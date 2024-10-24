import React, { useState } from "react";
import DashboardLayout from "../DashboardLayout";
import Loading from "@/common/loading";
import Topbar from "@/dashboard/components/topbar";
import { PutRequest } from "@/utils/requests";
import cogoToast from "cogo-toast";

const Overview = () => {
  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // handle update
  const handleUpdate = async () => {
    const token = localStorage.getItem("token") || "";

    const payload = {
      currentPassword: oldpassword,
      newPassword: newpassword,
    };

    setLoading(true);

    const res = await PutRequest("/user/password", payload, token);
    if (res?.status === 200 || res?.status === 201) {
      cogoToast.success(res?.data?.message);
      setLoading(false);
      setOldPassword("");
      setNewPassword("");
    } else {
      setLoading(false);
    }
  };

  //

  return (
    <DashboardLayout>
      <section className="sections">
        <Topbar title="Change Password" subtitle="Change your password here" />

        <div className="settings">
          {/* Profile input section  */}
          <div className="form-box">
            <div className="row mb-2 mb-md-4">
              <div className="col-12">
                <label className="mb-1">Current Password</label>
                <input
                  autoComplete="off"
                  type="password"
                  className="input form-control"
                  placeholder="********"
                  value={oldpassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="row mb-2 mb-md-4">
              <div className="col-12">
                <label className="mb-1">Enter New Password</label>
                <input
                  autoComplete="off"
                  type="password"
                  className="input form-control"
                  placeholder="********"
                  value={newpassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

export default Overview;
