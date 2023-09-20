import React, { useEffect, useState } from "react";

import Info from "../../components/profile/Info";
import Posts from "../../components/profile/Posts";
import Saved from "../../components/profile/Saved";

import { useSelector, useDispatch } from "react-redux";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import { getProfileUsers } from "../../redux/actions/profileAction";
import { useParams } from "react-router-dom";
import LeftSideBar from "../../components/home/LeftSideBar";
import RightSideBar from "../../components/home/RightSideBar";

const Profile = () => {
  const { profile, auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();
  const [saveTab, setSaveTab] = useState(false);

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <div className="d-flex">
      <div className="col-md-2 px-0 d-none d-md-block">
        <LeftSideBar />
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="profile col-md-5 col-12 feed ">
        <Info
          auth={auth}
          profile={profile}
          dispatch={dispatch}
          id={id}
          theme={theme}
        />

        {auth?.user._id === id && (
          <div className="profile_tab">
            <button
              className={`action-btn ${saveTab ? "" : "active"}`}
              onClick={() => setSaveTab(false)}
              style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
            >
              Posts
            </button>
            <button
              className={`action-btn ${saveTab ? "active" : ""}`}
              onClick={() => setSaveTab(true)}
              style={{ color: theme ? "#000" : "rgb(243,243,247)" }}
            >
              Saved
            </button>
          </div>
        )}

        {profile.loading ? (
          <HourglassTopRoundedIcon
            sx={{ color: theme ? "#000" : "rgb(243,243,247)" }}
          />
        ) : (
          <>
            {saveTab ? (
              <Saved auth={auth} dispatch={dispatch} />
            ) : (
              <Posts
                auth={auth}
                profile={profile}
                dispatch={dispatch}
                id={id}
              />
            )}
          </>
        )}
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-3 d-none d-md-block feed">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Profile;
