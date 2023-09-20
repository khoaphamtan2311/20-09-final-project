import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { deleteMessages } from "../../redux/actions/messageAction";
import { IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const MsgDisplay = ({ user, msg, theme, data }) => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm("Do you want to delete?")) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  return (
    <>
      <div className="chat_title mb-2">
        <span
          style={{
            color: theme ? "#000" : "rgb(243,243,247)",
            marginRight: "5px",
          }}
        >
          @{user.username}
        </span>
        <Avatar src={user.avatar} size="medium-avatar" />
      </div>

      <div className="you_content d-flex">
        {user._id === auth?.user._id && (
          <IconButton onClick={handleDeleteMessages}>
            <DeleteRoundedIcon sx={{ color: "#777777" }} />
          </IconButton>
        )}

        <div>
          {msg.text && (
            <div
              className="chat_text"
              style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
            >
              {msg.text}
            </div>
          )}
        </div>
      </div>

      <div className="chat_time">
        {new Date(msg.createdAt).toLocaleString()}
      </div>
    </>
  );
};

export default MsgDisplay;
