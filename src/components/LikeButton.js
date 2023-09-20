import React from "react";
import { useSelector } from "react-redux";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import { IconButton } from "@mui/material";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector((state) => state);
  console.log("theme", theme);

  return (
    <>
      {isLike ? (
        <IconButton
          style={{
            color: "crimson",
            border: "none !important",
          }}
          onClick={handleUnLike}
        >
          <FavoriteRoundedIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={handleLike}
          sx={{
            color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)",
            border: "none",
          }}
        >
          <FavoriteBorderRoundedIcon />
        </IconButton>
      )}
    </>
  );
};

export default LikeButton;
