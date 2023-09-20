import React from "react";
import LeftSide from "../../components/message/LeftSide";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";

const Message = () => {
  return (
    <div className="container message d-flex">
      <div className="col-md-4 px-0">
        <LeftSide />
      </div>

      <div className="col-md-8 px-0 right_mess">
        <div
          className="d-flex justify-content-center 
                align-items-center flex-column h-100"
        >
          <NearMeRoundedIcon sx={{ fontSize: 80, color: "#777777" }} />
          <h3>Let have some chats!</h3>
        </div>
      </div>
    </div>
  );
};

export default Message;
