import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/store/GlobalState";
import { screenPixels } from "@/utils/screenpx";

//

export default function Navbar() {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const [notify] = useState([]);
  const [notifyLoading] = useState(true);
  const [device, setDevice] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // get screen size
  useEffect(() => {
    screenPixels("900px", setDevice);
  }, []);

  // Logout user
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  // navigate
  const navigate = () => {
    if (device) {
      router.push("/settings/notifications");
    } else {
      return;
    }
  };

  //

  return (
    <div className="dashboard-nav">
      <nav className="navbar navbar-expand-lg bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* <span className="navbar-toggler-icon"></span> */}
          <i className="bi bi-list"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href={"/dashboard/overview"}
                className={`nav-link ${router.asPath.includes("/dashboard/overview") && "active"}`}
              >
                <i className="bi bi-grid" />
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/dashboard/orders"
                className={`nav-link ${
                  router.asPath.includes("/orders") && "active"
                }`}
              >
                <i className="bi bi-box-seam"></i>
                Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/product"
                className={`nav-link ${
                  router.asPath.includes("/product") && "active"
                }`}
              >
                <i className="bi bi-boxes"></i>
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={"/dashboard/payments"}
                className={`nav-link ${router.asPath.includes("/payments") && "active"}`}
              >
                <i className="bi bi-credit-card-2-back"></i>
                Payments
              </Link>
            </li>

            <hr className="border-bottom" />

            <li className="nav-item">
              <Link
                href={"/dashboard/address-book"}
                className={`nav-link ${router.asPath.includes("/address-book") && "active"}`}
              >
                <i className="bi bi-journal-text"></i>
                Address Book
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link
                href={"/dashboard/reviews"}
                className={`nav-link ${router.asPath.includes("/reviews") && "active"}`}
              >
                <i className="bi bi-star-half"></i>
                Ratings & Reviews
              </Link>
            </li> */}

            <li className="nav-item">
              <Link
                href={"/dashboard/profile-settings"}
                className={`nav-link ${router.asPath.includes("/profile-settings") && "active"}`}
              >
                <i className="bi bi-person-bounding-box"></i>
                Profile Settings
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={"/dashboard/change-password"}
                className={`nav-link ${router.asPath.includes("/change-password") && "active"}`}
              >
                <i className="bi bi-building-lock"></i>
                Change Password
              </Link>
            </li>
          </ul>

          {/* Footer section */}
          <div className="nav-footer">
            <div className="row d-flex align-items-center justify-content-between">
              {/* user profile settings */}
              <div className="col-3 profile-show">
                <div className="profile-img-container">
                  <Image
                    src={user?.avatar}
                    height={100}
                    width={100}
                    alt="profile-icon"
                  />
                </div>

                {/* profile settings */}
                <div className="profile-notification">
                  <div className="profile-box ">
                    <Link
                      href="/settings"
                      className={`profile-link ${
                        router.asPath.includes("/settings") ? "active" : ""
                      }`}
                    >
                      My profile
                    </Link>
                  </div>

                  <div className="profile-box" onClick={handleLogout}>
                    <p className="profile-link">Logout</p>
                  </div>
                </div>
              </div>

              {/* notification bell */}
              <div className="col-3 main-show">
                <div className="bell" onClick={navigate}>
                  {!notifyLoading &&
                    (state?.notifications || notify?.length !== 0) && (
                      <div className="bell-active"></div>
                    )}
                  <i className="bi bi-bell float-end">&nbsp;</i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
