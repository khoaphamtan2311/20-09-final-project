import React, { useEffect } from "react";

import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import RightSideBar from "../components/home/RightSideBar";
import LeftSideBar from "../components/home/LeftSideBar";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import SwitchIcon from "../icons/SwitchIcon";

let scroll = 0;

const Home = () => {
  const { homePosts } = useSelector((state) => state);

  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageYOffset;
      return scroll;
    }
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <div className="home row mx-0">
      <div className="col-md-2 px-0">
        <LeftSideBar />
      </div>
      <div className="col-md-1" />
      <div className="col-md-5 col-12 feed">
        <Status />
        <div className="home-line"></div>
        {homePosts.loading ? (
          <HourglassTopRoundedIcon sx={{ color: "rgb(243,243,247)" }} />
        ) : homePosts.result === 0 && homePosts.posts.length === 0 ? (
          <h2 className="text-center no-post-alert">No Post</h2>
        ) : (
          <Posts />
        )}
        <Link to="/discover">
          <div className="discovery-btn">
            <button>
              <div className="feed-switch">
                <div className="feed-switch-text">
                  <span>Discovery</span>
                </div>
                <div className="feed-switch-icon">
                  <SwitchIcon />
                </div>
              </div>
            </button>
          </div>
        </Link>
      </div>

      {/* <div className="col-md-1" /> */}
      <div className="col-md-4 d-none d-md-block feed">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
