import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowFollowing,
  msg,
}) => {
  const { theme } = useSelector((state) => state);

  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowFollowing) setShowFollowing(false);
  };

  const showMsg = (user) => {
    return (
      <>
        <div>{user?.text}</div>
        {user?.media.length > 0 && (
          <div>
            {user?.media.length} <i className="fas fa-image" />
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className={`user-card d-flex p-3 pl-4 align-items-center justify-content-between w-auto ${border}`}
      >
        <div style={{ maxWidth: "50%", overflow: "hidden" }}>
          <Link
            to={`/profile/${user?._id}`}
            onClick={handleCloseAll}
            className="d-flex align-items-center user-link"
          >
            <Avatar src={user?.avatar} size="big-avatar" />
            <div
              className="ml-3"
              style={{
                transform: "translateY(-2px)",
              }}
            >
              <small
                style={{
                  opacity: 0.7,
                  color: theme ? "#000" : "rgb(243,243,247)",
                  fontSize: "20px",
                }}
              >
                {user?.fullname}
              </small>
              <span
                className="d-block"
                style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
              >
                {msg ? showMsg(user) : `@${user?.username}`}
              </span>
            </div>
          </Link>
        </div>
        {children}
      </div>
      <div className="d-flex justify-content-end">
        <div className="user-card_line" />
      </div>
    </>
  );
};

export default UserCard;
