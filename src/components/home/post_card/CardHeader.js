import React from "react";
import Avatar from "../../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../utils/config";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const CardHeader = ({ post }) => {
  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };

  const handleDeletePost = () => {
    if (window.confirm("Are you sure want to delete this post?")) {
      dispatch(deletePost({ post, auth, socket }));
      return navigate("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.avatar} size="big-avatar" />

        <div className="card_name ml-3">
          <h6 className="m-0">
            <Link
              to={`/profile/${post?.user?._id}`}
              style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
            >
              {post?.user?.username}
            </Link>
          </h6>
          <small style={{ color: theme ? "#999999" : "#777777" }}>
            {moment(post?.createdAt).fromNow()}
          </small>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-toggle="dropdown"
          style={{
            color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
            fontSize: "large",
          }}
        >
          <MoreHorizRoundedIcon />
        </span>

        <div className="dropdown-menu">
          {auth?.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                Edit Post
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                Remove Post
              </div>
            </>
          )}

          <div className="dropdown-item" onClick={handleCopyLink}>
            Copy Link
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
