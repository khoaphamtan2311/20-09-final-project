import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import Avatar from "../Avatar";
import NotifyModal from "../NotifyModal";
import HomeIcon from "../../icons/HomeIcon";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import SearchIcon from "../../icons/SearchIcon";
import { Dialog, IconButton } from "@mui/material";
import Dropdown from "@mui/joy/Dropdown";
import MenuComp from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";

const Menu = () => {
  const { auth, theme, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const isActive = (pn) => {
    if (pn === pathname) return "active";
  };
  const navLinks = [
    { label: "Home", icon: <HomeIcon isActive={isActive} />, path: "/" },
    {
      label: "Message",
      icon: (
        <NearMeRoundedIcon
          sx={{
            color: theme ? "rgb(119,119,119)" : "rgb(243,243,247)",
            fontSize: 30,
          }}
        />
      ),
      path: "/message",
    },
    {
      label: "Discover",
      icon: <SearchIcon />,
      path: "/search",
    },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="menu">
      <ul className="navbar-nav flex-row justify-content-between">
        {navLinks.map((link, index) => (
          <li className={`nav-item px-2 ${isActive(link.path)} `} key={index}>
            <Link className="nav-link" to={link.path}>
              {link.icon}
            </Link>
          </li>
        ))}

        <span
          className="nav-link position-relative"
          role="button"
          onClick={handleClickOpen}
        >
          <IconButton
            sx={{
              color: theme ? "rgb(119, 119, 119)" : "rgb(243,243,247)",
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

        <li className="nav-item dropdown" style={{ opacity: 1 }}>
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
                border: "none",
                backgroundColor: theme ? "rgb(255,255,255)" : "rgb(16,16,16)",
              }}
            >
              <MenuItem>
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
                  className="dropdown-item"
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
        </li>
      </ul>
    </div>
  );
};

export default Menu;
