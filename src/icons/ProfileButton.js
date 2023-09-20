import React, { useState } from "react";
import { useSelector } from "react-redux";

function ProfileButton({ isActive }) {
  const { theme } = useSelector((state) => state);
  const [active] = useState(
    isActive ? (theme ? "rgb(30,30,30)" : "rgb(243,243,247)") : "transparent"
  );
  const [activeStroke] = useState(
    isActive ? "transparent" : theme ? "#999999" : "#777777"
  );
  return (
    <svg
      aria-label="Trang cá nhân"
      fill={active}
      height="26"
      role="img"
      viewBox="0 0 26 26"
      width="26"
    >
      <title>Trang cá nhân</title>
      <circle
        cx="13"
        cy="7.25"
        r="4"
        stroke={activeStroke}
        strokeWidth="2.5"
      ></circle>
      <path
        d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
        stroke={activeStroke}
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}

export default ProfileButton;
