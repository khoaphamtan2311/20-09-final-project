import React from "react";
import { Link } from "react-router-dom";

import { Box, Dialog, IconButton } from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import MenuComp from "@mui/joy/Menu";
import Avatar from "../Avatar";
import MenuItem from "@mui/joy/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { logout } from "../../redux/actions/authAction";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import NotifyModal from "../NotifyModal";

const Header = () => {
  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

        <div className="d-flex">
          <div className="d-none d-md-block">
            <span
              className="nav-link position-relative"
              role="button"
              onClick={handleClickOpen}
            >
              <IconButton
                sx={{
                  color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
                  paddingTop: 0,
                  border: "none",
                }}
              >
                <FavoriteBorderRoundedIcon sx={{ fontSize: 30 }} />
                <span className="notify_length">{notify?.data?.length}</span>
              </IconButton>
            </span>
            <Dialog
              open={open}
              onClose={handleClose}
              sx={{
                "& .MuiDialog-paper": {
                  borderRadius: "20px",
                  backgroundColor: theme ? "rgb(255,255,255)" : "rgb(30,30,30)",
                },
              }}
            >
              <NotifyModal />
            </Dialog>
          </div>

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
                  backgroundColor: theme ? "rgb(255,255,255)" : "rgb(30,30,30)",
                  border: "none",
                }}
              >
                <MenuItem sx={{ ":hover": { backgroundColor: "#777777" } }}>
                  <Link
                    className="dropdown-item link-hover"
                    to={`/profile/${auth?.user?._id}`}
                    style={{
                      color: theme ? "rgb(16,16,16)" : "rgb(243,243,247)",
                    }}
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
                    style={{
                      color: theme ? "rgb(16,16,16)" : "rgb(243,243,247)",
                    }}
                  >
                    {theme ? "Dark mode" : "Light mode"}
                  </label>
                </MenuItem>
                <MenuItem>
                  <Link
                    className="dropdown-item link-hover"
                    to="/"
                    onClick={() => dispatch(logout())}
                    style={{
                      color: theme ? "rgb(16,16,16)" : "rgb(243,243,247)",
                    }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </MenuComp>
            </Dropdown>
          </div>
        </div>
      </nav>
    </Box>
  );
};

export default Header;
