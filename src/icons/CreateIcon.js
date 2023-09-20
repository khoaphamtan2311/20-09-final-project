import React from "react";
import { useSelector } from "react-redux";

function CreateIcon() {
  const { theme } = useSelector((state) => state);
  return (
    <svg
      aria-label="Tạo"
      color={theme ? "#999999" : "#777777"}
      fill="transparent"
      height="30"
      role="img"
      viewBox="0 0 26 26"
      width="30"
    >
      <title>Tạo</title>
      <path
        d="M22.75 13L22.75 13.15C22.75 16.5103 22.75 18.1905 22.096 19.4739C21.5208 20.6029 20.6029 21.5208 19.4739 22.096C18.1905 22.75 16.5103 22.75 13.15 22.75L12.85 22.75C9.48969 22.75 7.80953 22.75 6.52606 22.096C5.39708 21.5208 4.4792 20.6029 3.90396 19.4739C3.25 18.1905 3.25 16.5103 3.25 13.15L3.25 12.85C3.25 9.48968 3.25 7.80953 3.90396 6.52606C4.4792 5.39708 5.39708 4.4792 6.52606 3.90396C7.80953 3.25 9.48968 3.25 12.85 3.25L13 3.25"
        stroke={theme ? "#999999" : "#777777"}
        strokeLinecap="round"
        strokeWidth="2.5"
      ></path>
      <path
        d="M21.75 4.25L13.75 12.25"
        stroke={theme ? "#999999" : "#777777"}
        strokeLinecap="round"
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}

export default CreateIcon;
