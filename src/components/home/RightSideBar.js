import React from "react";
import { useSelector, useDispatch } from "react-redux";

import UserCard from "../UserCard";
import FollowBtn from "../FollowBtn";
import CachedIcon from "@mui/icons-material/Cached";
import { getSuggestions } from "../../redux/actions/suggestionsAction";
import { IconButton } from "@mui/material";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";

const RightSideBar = () => {
  const { auth, suggestions, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="mt-3 pr-5">
      <UserCard user={auth?.user} />

      <div className="d-flex justify-content-between align-items-center my-2">
        <h4 style={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}>
          Suggestions for you
        </h4>
        {!suggestions.loading && (
          <IconButton
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(getSuggestions(auth?.token))}
            sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
          >
            <CachedIcon />
          </IconButton>
        )}
      </div>

      {suggestions.loading ? (
        <HourglassTopRoundedIcon
          sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
        />
      ) : (
        <div className="suggestions">
          {suggestions.users.map((user) => (
            <UserCard key={user?._id} user={user}>
              <FollowBtn user={user} />
            </UserCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default RightSideBar;
