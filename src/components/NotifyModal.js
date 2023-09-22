import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from "moment";
import {
  isReadNotify,
  NOTIFY_TYPES,
  deleteAllNotifies,
} from "../redux/actions/notifyAction";
import CircleIcon from "@mui/icons-material/Circle";
import { IconButton } from "@mui/material";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import NotificationsOffRoundedIcon from "@mui/icons-material/NotificationsOffRounded";

const NotifyModal = () => {
  const { auth, notify, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
  };

  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };

  const handleDeleteAll = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth?.token));

    if (
      window.confirm(
        `You have ${newArr.length} unread notices. Are you sure you want to delete all?`
      )
    ) {
      return dispatch(deleteAllNotifies(auth?.token));
    }
  };

  return (
    <div
      style={{
        minWidth: "200px",
        backgroundColor: theme ? "rgb(255,255,255)" : "rgb(30,30,30)",
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3
          style={{
            fontWeight: 700,
            padding: "10px 0",
            color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
          }}
        >
          Notification
        </h3>
        {notify.sound ? (
          <IconButton onClick={handleSound}>
            <NotificationsActiveRoundedIcon
              sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={handleSound}>
            <NotificationsOffRoundedIcon
              sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
            />
          </IconButton>
        )}
      </div>
      <hr
        className="mt-0"
        style={{ borderTopColor: "rgb(243,243,247, 0.45", margin: "10px 10px" }}
      />

      {notify.data.length === 0 && (
        <h5
          style={{
            color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
            padding: "0 20px",
          }}
        >
          Nothing to see here!
        </h5>
      )}

      <div
        style={{
          maxHeight: "calc(100vh - 200px)",
          overflow: "auto",
          padding: "0 20px",
        }}
      >
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center"
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user?.avatar} size="big-avatar" />

              <div
                className="mx-2 flex-fill"
                style={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
              >
                <div>
                  <strong className="mr-1">@{msg.user?.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>

              {msg.image && (
                <div style={{ width: "30px" }}>
                  {msg.image.match(/video/i) ? (
                    <video src={msg.image} width="100%" />
                  ) : (
                    <Avatar src={msg.image} size="medium-avatar" />
                  )}
                </div>
              )}
            </Link>
            <small className="text-muted d-flex justify-content-end px-2 py-1">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && (
                <CircleIcon
                  sx={{
                    color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
                    fontSize: "small",
                    marginLeft: "10px",
                    marginTop: "5px",
                  }}
                />
              )}
            </small>
          </div>
        ))}
      </div>

      <hr className="my-1" />
      <div
        className="text-right mr-2"
        style={{
          cursor: "pointer",
          color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
          padding: "20px 10px",
        }}
        onClick={handleDeleteAll}
      >
        Delete All
      </div>
    </div>
  );
};

export default NotifyModal;
