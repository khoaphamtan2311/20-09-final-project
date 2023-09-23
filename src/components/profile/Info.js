import React, { useState, useEffect } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Info = ({ id, auth, profile, dispatch, theme }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);

  useEffect(() => {
    if (id === auth?.user._id) {
      setUserData([auth?.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);

  useEffect(() => {
    if (setShowFollowing || setShowFollowers || setOnEdit) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [dispatch, setShowFollowers, setShowFollowing, setOnEdit]);

  return (
    <div className="info">
      {userData.map((user) => (
        <div className="info_container" key={user._id}>
          <Avatar src={user.avatar} size="supper-avatar" />

          <div className="info_content">
            <div className="info_content_title">
              <h2
                style={{
                  color: theme ? "#000" : "rgb(243,243,247)",
                  fontWeight: 700,
                }}
              >
                {user.fullname}
              </h2>
              {user._id === auth?.user._id ? (
                <button
                  className="btn action-btn"
                  onClick={() => setOnEdit(true)}
                >
                  Edit Profile
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>

            <h4 style={{ color: theme ? "#999999" : "#777777" }}>
              @{user.username}{" "}
              <span style={{ color: theme ? "#999999" : "#777777" }}>
                | {user.mobile}
              </span>
            </h4>

            <div className="follow_btn mt-3 d-flex justify-content-start">
              <span
                className="mr-4 show-follow"
                onClick={() => setShowFollowers(true)}
              >
                {user.followers.length} Followers
              </span>
              <span
                className="ml-4 show-follow"
                onClick={() => setShowFollowing(true)}
              >
                {user.following.length} Following
              </span>
            </div>

            <a
              href={user.website}
              target="_blank"
              rel="noreferrer"
              style={{
                color: theme ? "#000" : "rgb(243,243,247)",
                fontWeight: 500,
              }}
            >
              {user.website}
            </a>
            <p
              style={{
                color: theme ? "#000" : "rgb(243,243,247)",
                fontWeight: 300,
              }}
            >
              {user.story}
            </p>
          </div>
          {onEdit === true && <EditProfile setOnEdit={setOnEdit} />}

          {showFollowers && (
            <Followers
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showFollowing && (
            <Following
              users={user.following}
              setShowFollowing={setShowFollowing}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Info;
