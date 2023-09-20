import React from "react";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import { IconButton } from "@mui/material";

const Icons = ({ setContent, content, theme }) => {
  const reactions = [
    "❤️",
    "😆",
    "😯",
    "😢",
    "😡",
    "👍",
    "👎",
    "😄",
    "😂",
    "😘",
    "😗",
    "😚",
    "😳",
    "😭",
    "😓",
    "😤",
    "🤤",
    "👻",
    "💀",
    "🤐",
    "😴",
    "😷",
    "😵",
  ];

  return (
    <div className="nav-item dropdown" style={{ opacity: 1 }}>
      <span
        className="nav-link position-relative px-1"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <IconButton
          sx={{ color: theme ? "rgb(30,30,30)" : "rgb(243,243,247)" }}
        >
          <AddReactionIcon />
        </IconButton>
      </span>

      <div
        className="dropdown-menu"
        aria-labelledby="navbarDropdown"
        style={{ backgroundColor: "rgb(16,16,16)" }}
      >
        <div className="reactions">
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Icons;
