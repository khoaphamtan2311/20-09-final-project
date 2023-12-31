import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRemove = () => {
    if (
      post.user._id === auth?.user._id ||
      comment.user._id === auth?.user._id
    ) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };

  const MenuItem = () => {
    return (
      <>
        <div className="dropdown-item" onClick={() => setOnEdit(true)}>
          Edit
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          Remove
        </div>
      </>
    );
  };

  return (
    <div className="menu">
      {(post.user._id === auth?.user._id ||
        comment.user._id === auth?.user._id) && (
        <div className="nav-item dropdown">
          <span
            className="material-icons"
            id="moreLink"
            data-toggle="dropdown"
            style={{
              color: theme ? "rgb(0,0,0)" : "rgb(243,243,247)",
              fontSize: "large",
            }}
          >
            <MoreVertRoundedIcon
              sx={{ color: theme ? "rgb(0,0,0)" : "rgb(243,243,247)" }}
            />
          </span>

          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth?.user._id ? (
              comment.user._id === auth?.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item" onClick={handleRemove}>
                  Remove
                </div>
              )
            ) : (
              comment.user._id === auth?.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
