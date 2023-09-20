import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDiscoverPosts,
  DISCOVER_TYPES,
} from "../redux/actions/discoverAction";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import LoadMoreBtn from "../components/LoadMoreBtn";
import { getDataAPI } from "../utils/fetchData";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import RightSideBar from "../components/home/RightSideBar";
import LeftSideBar from "../components/home/LeftSideBar";
import PostCard from "../components/PostCard";
import SwitchIcon from "../icons/SwitchIcon";
import { Link } from "react-router-dom";

const Discover = () => {
  const { auth, discover } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (discover.firstLoad === false) {
      dispatch(getDiscoverPosts(auth?.token));
    }
  }, [dispatch, auth?.token, discover?.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth?.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div className="d-flex">
      <div className="col-md-2 px-0 d-none d-md-block">
        <LeftSideBar />
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-5 col-12 feed ">
        {discover.loading ? (
          <HourglassEmptyIcon />
        ) : discover.result === 0 ? (
          <p>Nothing to see here</p>
        ) : (
          discover.posts?.map((post) => <PostCard key={post._id} post={post} />)
        )}

        {load && <HourglassTopRoundedIcon sx={{ color: "rgb(243,243,247)" }} />}

        {!discover.loading && (
          <LoadMoreBtn
            result={discover.result}
            page={discover.page}
            load={load}
            handleLoadMore={handleLoadMore}
          />
        )}
        <Link to="/">
          <div className="discovery-btn">
            <button>
              <div className="feed-switch">
                <div className="feed-switch-text">
                  <span>Following</span>
                </div>
                <div className="feed-switch-icon">
                  <SwitchIcon />
                </div>
              </div>
            </button>
          </div>
        </Link>
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-3 d-none d-md-block feed">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Discover;
