import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import {
  likePost,
  unLikePost,
  savePost,
  unSavePost,
} from "../../../redux/actions/postAction";
import ShareModal from "../../ShareModal";
import { BASE_URL } from "../../../utils/config";
import CommentButton from "../../../icons/CommentButton";
import { IconButton } from "@mui/material";
import ShareButton from "../../../icons/ShareButton";
import TurnedInRoundedIcon from "@mui/icons-material/TurnedInRounded";
import TurnedInNotRoundedIcon from "@mui/icons-material/TurnedInNotRounded";

const CardFooter = ({ post }) => {
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [isShare, setIsShare] = useState(false);

  const { auth, theme, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  // Likes
  useEffect(() => {
    if (post.likes.find((like) => like._id === auth?.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth?.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  // Saved
  useEffect(() => {
    if (auth?.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth?.user.saved, post._id]);

  const handleSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
    setSaveLoad(false);
  };

  const handleUnSavePost = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
  };

  return (
    <div className="card_footer">
      <div className="card_icon_menu">
        <div>
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />

          <Link to={`/post/${post._id}`} className="text-dark">
            <CommentButton />
          </Link>

          <IconButton onClick={() => setIsShare(!isShare)}>
            <ShareButton />
          </IconButton>
        </div>

        {saved ? (
          <IconButton
            onClick={handleUnSavePost}
            className="icon-color"
            sx={{
              stroke: "transparent !important",
              ":focus": { border: "none" },
              ":active": { border: "none" },
            }}
          >
            <TurnedInRoundedIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleSavePost}
            className="icon-color"
            sx={{ stroke: "transparent !important" }}
          >
            <TurnedInNotRoundedIcon />
          </IconButton>
        )}
      </div>

      <div className="d-flex justify-content-start mt-2">
        <h6
          style={{
            padding: "0 25px",
            cursor: "pointer",
            color: "#777777",
          }}
        >
          {post.likes.length} likes
        </h6>

        <h6
          style={{
            padding: "0 25px",
            cursor: "pointer",
            color: "#777777",
          }}
        >
          {post.comments.length} comments
        </h6>
      </div>

      {isShare && (
        <ShareModal url={`${BASE_URL}/post/${post._id}`} theme={theme} />
      )}
    </div>
  );
};

export default CardFooter;
