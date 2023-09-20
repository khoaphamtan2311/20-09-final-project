import React, { useState } from "react";
import { useSelector } from "react-redux";

function HomeIcon({ isActive }) {
  const { theme } = useSelector((state) => state);
  const [active] = useState(
    isActive ? (theme ? "rgb(30,30,30)" : "rgb(243,243,247)") : "transparent"
  );
  const [activeStroke] = useState(
    isActive ? "transparent" : theme ? "#999999" : "#777777"
  );
  return (
    <svg
      aria-label="Trang chủ"
      className="icon-color"
      fill="transparent"
      height="30"
      role="img"
      viewBox="0 0 26 26"
      width="30"
    >
      <title>Trang chủ</title>
      <path
        d="M2.25 12.8855V20.7497C2.25 21.8543 3.14543 22.7497 4.25 22.7497H8.25C8.52614 22.7497 8.75 22.5259 8.75 22.2497V17.6822V17.4997C8.75 15.1525 10.6528 13.2497 13 13.2497C15.3472 13.2497 17.25 15.1525 17.25 17.4997V17.6822V22.2497C17.25 22.5259 17.4739 22.7497 17.75 22.7497H21.75C22.8546 22.7497 23.75 21.8543 23.75 20.7497V12.8855C23.75 11.3765 23.0685 9.94815 21.8954 8.99883L16.1454 4.3454C14.3112 2.86095 11.6888 2.86095 9.85455 4.3454L4.10455 8.99883C2.93153 9.94815 2.25 11.3765 2.25 12.8855Z"
        fill={active}
        stroke={activeStroke}
        strokeLinecap="round"
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}

export default HomeIcon;
