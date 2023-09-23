import React from "react";
import Logo from "../../images/GistApp-01.png";
import { useSelector } from "react-redux";

const Loading = () => {
  const { theme } = useSelector((state) => state);
  return (
    <div
      className="d-flex flex-column position-fixed w-100 h-100 text-center loading"
      style={{
        background: theme ? "rgb(255,255,255)" : "rgb(16,16,16)",
        color: "white",
        top: 0,
        left: 0,
        zIndex: 50,
      }}
    >
      <img src={Logo} alt="" style={{ width: "200px", height: "auto" }} />
      <h4>Loading...</h4>
    </div>
  );
};

export default Loading;
