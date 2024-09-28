import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "@/store/GlobalState";
import Loading from "@/common/loading";
import { screenPixels } from "@/utils/screenpx";
import { LogoWhite } from "../../../public/assets";

//

export default function Navbar() {
  const router = useRouter();
  const { state } = useContext(DataContext);
  const [profileImage] = useState(null);
  const [notifications] = useState(null);
  const [notify] = useState([]);
  const [notifyLoading] = useState(true);
  const [device, setDevice] = useState(false);

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
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href={""}
                className={`nav-link ${router.asPath.includes("") && "active"}`}
              >
                <i className="bi bi-grid" />
                Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/fleet-management"
                className={`nav-link ${
                  router.asPath.includes("fleet-management") && "active"
                }`}
              >
                <i className="bi bi-file-text"></i>
                Fleet Management
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/riders-management"
                className={`nav-link ${
                  router.asPath.includes("riders-management") && "active"
                }`}
              >
                <i className="bi bi-people"></i>
                Riders Management
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/real-time-tracking"
                className={`nav-link ${
                  router.asPath.includes("real-time-tracking") && "active"
                }`}
              >
                <i className="bi bi-geo-alt"></i>
                Real Time Tracking
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={""}
                className={`nav-link ${router.asPath.includes("") && "active"}`}
              >
                <i className="bi bi-card-text" />
                Transaction
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/reporting/report-per-riders"
                className={`nav-link ${
                  router.asPath.includes("reporting") && "active"
                }`}
              >
                <i className="bi bi-graph-up" />
                Reports
              </Link>
            </li>

            <hr className="border-bottom" />

            <li className="nav-item">
              <Link className="nav-link" href="#">
                <i className="bi bi-calendar-week" />
                Campaign <span>coming soon</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href={""}
                className={`nav-link ${router.asPath.includes("") && "active"}`}
              >
                <i className="bi bi-gear" />
                Settings
              </Link>
            </li>
          </ul>

          {/* Footer section */}
          <div className="nav-footer">
            <div className="row d-flex align-items-center justify-content-between">
              {/* user profile settings */}
              <div className="col-3 profile-show">
                <div className="profile-img-container">
                  {profileImage && (
                    <Image
                      src={
                        profileImage === "null"
                          ? "/images/profile-image.png"
                          : profileImage
                      }
                      height={100}
                      width={100}
                      alt="profile-icon"
                    />
                  )}
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

                  {/* Sidebar notification popup */}
                  {notifyLoading ? (
                    <div className="sidebar-notification">
                      <div
                        style={{ height: "100px" }}
                        className="empty-content d-flex align-items-center justify-content-center"
                      >
                        <Loading
                          height="30px"
                          width="30px"
                          primaryColor="#ffc619"
                          secondaryColor="#ffc619"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      {notifications?.length === 0 || !notifications ? (
                        <div className="sidebar-notification ">
                          <div
                            style={{ height: "100px" }}
                            className="empty-content d-flex align-items-center justify-content-center"
                          >
                            <div className="text-center">
                              <p className="mb-2">
                                You have no notifications yet
                              </p>
                              <Link href="/settings/notifications">
                                All notifications
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="sidebar-notification">
                          {notifications?.slice(0, 2).map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="row notification-box"
                                // onClick={() => {
                                //   router.push("/settings/notifications"),
                                //     dispatch({
                                //       type: ACTIONS.NOTIFICATIONS,
                                //       payload: null,
                                //     });
                                // }}
                              >
                                <div className="col-1">
                                  {item.status === "ACTIVE" ? (
                                    <div
                                      className="status"
                                      style={{
                                        background: "#FFC619",
                                        border: "none",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      className="status"
                                      style={{
                                        background: "#FFF",
                                        border: "2px solid #333333 ",
                                      }}
                                    ></div>
                                  )}
                                </div>

                                <div className="col-8">
                                  <div className="heading">{item.title}</div>
                                  <p>{item.body}</p>
                                </div>

                                <div className="col-3">
                                  <p className="time-ago">
                                    {/* {format(convertDate(item.createdAt))} */}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          <div className="manage-notification">
                            <p
                            // onClick={() => {
                            //   router.push("/settings/notifications"),
                            //     dispatch({
                            //       type: ACTIONS.NOTIFICATIONS,
                            //       payload: null,
                            //     });
                            // }}
                            >
                              All notifications
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
