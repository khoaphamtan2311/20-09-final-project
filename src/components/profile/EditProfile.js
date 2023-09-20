import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../utils/imageUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfileUser } from "../../redux/actions/profileAction";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";

const EditProfile = ({ setOnEdit }) => {
  const initState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, mobile, address, website, story, gender } = userData;

  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth?.user);
  }, [auth?.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];

    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });

    setAvatar(file);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfileUser({ userData, avatar, auth }));
  };

  return (
    <div className="edit_profile">
      <button
        className="btn action-btn btn_close"
        style={{ borderWidth: 3 }}
        onClick={() => setOnEdit(false)}
      >
        Close
      </button>

      <form onSubmit={handleSubmit}>
        <div className="info_avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth?.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
          />
          <span>
            <AddPhotoAlternateRoundedIcon
              sx={{ color: "rgb(243,243,247", fontSize: "large" }}
            />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>

        <div className="form-group">
          <label
            htmlFor="fullname"
            style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
          >
            Full Name
          </label>
          <div className="position-relative">
            <input
              type="text"
              className="form-control"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
              style={{
                backgroundColor: "rgb(16,16,16)",
                padding: "20px",
                borderRadius: "12px",
                border: "none",
                color: "rgb(243,243,247)",
              }}
            />
            <small
              className="position-absolute"
              style={{
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                color: "#777777",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>

        <div className="form-group">
          <label
            htmlFor="mobile"
            style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
          >
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={mobile}
            className="form-control"
            onChange={handleInput}
            style={{
              backgroundColor: "rgb(16,16,16)",
              padding: "20px",
              borderRadius: "12px",
              border: "none",
              color: "rgb(243,243,247)",
            }}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="address"
            style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
          >
            Address
          </label>
          <input
            type="text"
            name="address"
            value={address}
            className="form-control"
            onChange={handleInput}
            style={{
              backgroundColor: "rgb(16,16,16)",
              padding: "20px",
              borderRadius: "12px",
              border: "none",
              color: "rgb(243,243,247)",
            }}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="website"
            style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
          >
            Website
          </label>
          <input
            type="text"
            name="website"
            value={website}
            className="form-control"
            onChange={handleInput}
            style={{
              backgroundColor: "rgb(16,16,16)",
              padding: "20px",
              borderRadius: "12px",
              border: "none",
              color: "rgb(243,243,247)",
            }}
          />
        </div>

        <div className="form-group">
          <label
            htmlFor="story"
            style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
          >
            Story
          </label>
          <textarea
            name="story"
            value={story}
            cols="30"
            rows="4"
            className="form-control"
            onChange={handleInput}
            style={{
              backgroundColor: "rgb(16,16,16)",
              padding: "20px",
              borderRadius: "12px",
              border: "none",
              color: "rgb(243,243,247)",
            }}
          />

          <small className=" d-block text-right" style={{ color: "#777777" }}>
            {story.length}/200
          </small>
        </div>

        <label
          htmlFor="gender"
          style={{ color: "rgb(243,243,247)", fontWeight: 500 }}
        >
          Gender
        </label>
        <div className="input-group-prepend px-0 mb-4">
          <select
            name="gender"
            id="gender"
            value={gender}
            className="custom-select text-capitalize"
            onChange={handleInput}
            style={{
              backgroundColor: "rgb(16,16,16)",
              padding: "20px",
              borderRadius: "12px",
              border: "none",
              color: "rgb(243,243,247)",
            }}
          >
            <option
              value="male"
              selected="selected"
              style={{
                color: "rgb(243,243,247)",
                fontWeight: "500",
                padding: "10px 20px",
              }}
            >
              Male
            </option>
            <option
              value="female"
              style={{ color: "rgb(243,243,247)", fontWeight: "500" }}
            >
              Female
            </option>
            <option
              value="other"
              style={{ color: "rgb(243,243,247)", fontWeight: "500" }}
            >
              Other
            </option>
          </select>
        </div>

        <button className="btn action-btn w-100" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
