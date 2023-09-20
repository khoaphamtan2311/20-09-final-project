import React from "react";
import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import { useSelector } from "react-redux";

const Followers = ({ users, setShowFollowers }) => {
  const { auth, theme } = useSelector((state) => state);
  return (
    <div className="follow">
      <div className="follow_box">
        <h5
          className="text-center"
          style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
        >
          Followers
        </h5>
        <hr />

        <div className="follow_content">
          {users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setShowFollowers={setShowFollowers}
            >
              {auth?.user._id !== user._id && <FollowBtn user={user} />}
            </UserCard>
          ))}
        </div>

        <div
          className="close"
          style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
          onClick={() => setShowFollowers(false)}
        >
          &times;
        </div>
      </div>
    </div>
  );
};

export default Followers;
