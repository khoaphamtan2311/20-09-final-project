import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar";
import moment from "moment";

import LikeButton from "../../LikeButton";
import { useSelector, useDispatch } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";
import { Link } from "@mui/material";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [onEdit, setOnEdit] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth?.user?._id)) {
      setIsLike(true);
    }
  }, [comment, auth?.user?._id]);

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);

    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);

    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const styleCard = {
    opacity: comment?._id ? 1 : 0.5,
    pointerEvents: comment?._id ? "inherit" : "none",
  };

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link
        to={`/profile/${comment?.user?._id}`}
        className="d-flex text-dark"
        sx={{ px: "25px", textDecoration: "none" }}
      >
        <Avatar src={comment?.user?.avatar} size="big-avatar" />
        <div className="card_name ml-3">
          <h6 className="m-0">
            <Link
              to={`/profile/${comment?.user?._id}`}
              style={{ color: "rgb(243,243,247)", textDecoration: "none" }}
            >
              {comment?.user?.username}
            </Link>
          </h6>
          <small style={{ color: "#777777" }}>
            {moment(comment?.createdAt).fromNow()}
          </small>
        </div>
      </Link>

      <div className="comment_content">
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "#111" : "white",
          }}
        >
          {onEdit ? (
            <textarea
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                backgroundColor: "rgb(30,30,30)",
                borderRadius: "12px",
                padding: "10px 20px",
                color: "#777777",
              }}
            />
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  to={`/profile/${comment.tag._id}`}
                  className="mr-1"
                  style={{ color: "rgb(243,243,247)" }}
                >
                  @{comment.tag.username}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              {content.length > 100 && (
                <span
                  className="readMore"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Hide content" : "Read more"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer", marginTop: "20px" }}>
            <small
              className="font-weight-bold mr-3"
              style={{ color: "#777777" }}
            >
              {comment.likes.length} likes
            </small>

            {onEdit ? (
              <>
                <small className="font-weight-bold mr-3" onClick={handleUpdate}>
                  Update
                </small>
                <small
                  className="font-weight-bold mr-3"
                  onClick={() => setOnEdit(false)}
                >
                  Cancel
                </small>
              </>
            ) : (
              <small
                className="font-weight-bold mr-3"
                onClick={handleReply}
                style={{ color: "#777777" }}
              >
                {onReply ? "cancel" : "reply"}
              </small>
            )}
          </div>
        </div>

        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: "pointer" }}
        >
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link
            to={`/profile/${onReply.user._id}`}
            className="mr-1"
            style={{ color: "rgb(243,243,247)" }}
          >
            @{onReply.user.username}:
          </Link>
        </InputComment>
      )}

      {children}
    </div>
  );
};

export default CommentCard;
