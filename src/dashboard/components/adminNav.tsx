import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { DataContext } from "@/store/GlobalState";
import { screenPixels } from "@/utils/screenpx";
import { LogoWhite } from "../../../public/assets";

//

export default function AdminNavbar() {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const [notify] = useState([]);
  const [notifyLoading] = useState(true);
  const [device, setDevice] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [avatar, setAvatar] = useState("");

  // get screen size
  useEffect(() => {
    screenPixels("900px", setDevice);
  }, []);

  useLayoutEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const avatar = localStorage.getItem("avatar") || "";
    setUser(user);
    setAvatar(avatar);
  }, [state?.callback]);

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
        <div className="product-image">
          <Link className="navbar-brand" href="/product">
            <LogoWhite />
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href={"/dashboard/admin/overview"}
                className={`nav-link ${router.asPath.includes("/dashboard/admin/overview") && "active"}`}
              >
                <i className="bi bi-grid" />
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/dashboard/admin/products"
                className={`nav-link ${
                  router.asPath.includes("/dashboard/admin/products") &&
                  "active"
                }`}
              >
                <i className="bi bi-boxes"></i>
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/dashboard/admin/orders"
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
                href="/dashboard/admin/categories"
                className={`nav-link ${
                  router.asPath.includes("/dashboard/admin/categories") &&
                  "active"
                }`}
              >
                <i className="bi bi-box2"></i>
                Categories
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={"/dashboard/admin/payments"}
                className={`nav-link ${router.asPath.includes("/dashboard/admin/payments") && "active"}`}
              >
                <i className="bi bi-credit-card-2-back"></i>
                Transactions
              </Link>
            </li>

            <hr className="border-bottom" />

            <li className="nav-item">
              <Link
                href={"/dashboard/address-book"}
                className={`nav-link ${router.asPath.includes("/dashboard/admin/address-book") && "active"}`}
              >
                <i className="bi bi-journal-text"></i>
                Address Book
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={"/dashboard/profile-settings"}
                className={`nav-link ${router.asPath.includes("/dashboard/admin/profile-settings") && "active"}`}
              >
                <i className="bi bi-person-bounding-box"></i>
                Profile Settings
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={"/dashboard/change-password"}
                className={`nav-link ${router.asPath.includes("/dashboard/admn/change-password") && "active"}`}
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
                    src={avatar || user?.avatar}
                    height={100}
                    width={100}
                    alt="profile-icon"
                  />
                </div>

                {/* profile settings */}
                <div className="profile-notification">
                  <div className="profile-box ">
                    <Link
                      href="/dashboard/profile-settings"
                      className={`profile-link ${
                        router.asPath.includes("/dashboard/profile-settings")
                          ? "active"
                          : ""
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
