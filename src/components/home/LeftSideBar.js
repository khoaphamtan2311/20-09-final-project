import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from "../../icons/HomeIcon";
import SearchIcon from "../../icons/SearchIcon";
import CreateIcon from "../../icons/CreateIcon";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { IconButton } from "@mui/material";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import ProfileButton from "../../icons/ProfileButton";

function LeftSideBar() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { auth } = useSelector((state) => state);

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };

  const isActiveTab = (pn) => {
    if (pn === pathname) return "active-tab";
  };
  return (
    <div className="left-side-bar d-none d-md-block">
      <div className="tabs-contain">
        <ul>
          <li className={`nav-item px-2 ${isActive("/")}`}>
            <Link className="nav-link" to={"/"}>
              <div
                className={`d-flex justify-content-center links ${isActiveTab(
                  "/"
                )}`}
              >
                <div>
                  <HomeIcon isActive={isActive("/")} />
                </div>
                <h2 className="d-none d-lg-block">Home</h2>
              </div>
            </Link>
          </li>

          <li className={`nav-item px-2 ${isActive("/search")}`}>
            <Link className="nav-link" to={"/search"}>
              <div
                className={`d-flex justify-content-center links ${isActiveTab(
                  "/search"
                )}`}
              >
                <div>
                  <SearchIcon isActive={isActive("/search")} />
                </div>
                <h2 className="d-none d-lg-block">Search</h2>
              </div>
            </Link>
          </li>

          <li className={`nav-item px-2 ${isActive("/")}`}>
            <Link className="nav-link" to={"/message"}>
              <div
                className={`d-flex justify-content-center links ${isActiveTab(
                  "/message"
                )}`}
              >
                <div>
                  <IconButton
                    className={`${isActive("/message")}  `}
                    sx={{
                      p: 0,
                      color: `${
                        isActive("/message") === "active"
                          ? "rgb(243,243,247)"
                          : "#777777"
                      }`,
                    }}
                  >
                    <NearMeRoundedIcon fontSize="large" />
                  </IconButton>
                </div>
                <h2 className="d-none d-lg-block">Chat</h2>
              </div>
            </Link>
          </li>

          <li className={`nav-item px-2 ${isActive("/")}`}>
            <Link className="nav-link" to={"/"}>
              <div
                className={`d-flex justify-content-center links`}
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.STATUS, payload: true })
                }
              >
                <div>
                  <CreateIcon />
                </div>
                <h2 className="d-none d-lg-block">Create</h2>
              </div>
            </Link>
          </li>

          <li
            className={`nav-item px-2 ${isActive(
              `/profile/${auth?.user?._id}`
            )}`}
          >
            <Link className="nav-link" to={`/profile/${auth?.user?._id}`}>
              <div
                className={`d-flex justify-content-center links ${isActiveTab(
                  `/profile/${auth?.user?._id}`
                )}`}
              >
                <div>
                  <IconButton
                    className={`${isActive(`/profile/${auth?.user?._id}`)}`}
                    sx={{
                      p: 0,
                      color: `${
                        isActive(`/profile/${auth?.user?._id}`) === "active"
                          ? "rgb(243,243,247)"
                          : "#777777"
                      }`,
                    }}
                  >
                    <ProfileButton
                      isActive={isActive(`/profile/${auth?.user?._id}`)}
                    />
                  </IconButton>
                </div>
                <h2 className="d-none d-lg-block">Profile</h2>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSideBar;
