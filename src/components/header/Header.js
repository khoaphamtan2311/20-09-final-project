import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import MenuComp from "@mui/joy/Menu";
import Avatar from "../Avatar";
import MenuItem from "@mui/joy/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";

const Header = () => {
  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <Box className="header">
      <nav className="navbar navbar-expand-lg navbar-light justify-content-between align-middle">
        <Link to="/" className="logo">
          <h3
            className="navbar-brand text-uppercase p-0 m-0 text-center ml-5 pl-5"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            Gists
          </h3>
        </Link>

        <div className="d-none d-md-block">
          <Dropdown>
            <MenuButton
              sx={{
                border: "none",
                padding: "8px 10px",
                ":hover": { backgroundColor: "transparent" },
              }}
            >
              <Avatar src={auth?.user?.avatar} size="medium-avatar" />
            </MenuButton>
            <MenuComp
              sx={{
                borderRadius: "20px",
                backgroundColor: "rgb(30,30,30)",
                border: "none",
              }}
            >
              <MenuItem sx={{ ":hover": { backgroundColor: "#777777" } }}>
                <Link
                  className="dropdown-item link-hover"
                  to={`/profile/${auth?.user?._id}`}
                >
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <label
                  htmlFor="theme"
                  className="dropdown-item link-hover"
                  onClick={() =>
                    dispatch({
                      type: GLOBALTYPES.THEME,
                      payload: !theme,
                    })
                  }
                >
                  {theme ? "Dark mode" : "Light mode"}
                </label>
              </MenuItem>
              <MenuItem>
                <Link
                  className="dropdown-item link-hover"
                  to="/"
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Link>
              </MenuItem>
            </MenuComp>
          </Dropdown>
        </div>
      </nav>
    </Box>
  );
};

export default Header;
