import { useState } from "react";
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
  const { auth, discover, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [load, setLoad] = useState(false);
  const [hidden, setHidden] = useState(true);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `post_discover?num=${discover.page * 9}`,
      auth?.token
    );
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  const handleDiscover = async () => {
    dispatch(getDiscoverPosts(auth.token));
    setHidden(false);
  };

  return (
    <div className="d-flex">
      <div className="col-md-2 px-0 d-none d-md-block">
        <LeftSideBar />
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-5 col-12 feed ">
        {!discover.firstLoad && (
          <button
            className="btn action-btn m-auto d-block"
            onClick={handleDiscover}
            de
          >
            Discover
          </button>
        )}
        {discover.loading ? (
          <HourglassEmptyIcon />
        ) : discover.result === 0 ? (
          <div className="d-flex justify-content-center">
            <h6 style={{ color: theme ? "rgb(16,16,16)" : "rgb(243,243,247)" }}>
              Nothing to see here
            </h6>
          </div>
        ) : (
          discover.posts?.map((post) => <PostCard key={post._id} post={post} />)
        )}

        {load && (
          <HourglassTopRoundedIcon
            sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
          />
        )}

        {!discover.loading && !hidden && (
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
      <div className="col-md-4 d-none d-md-block feed">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Discover;
