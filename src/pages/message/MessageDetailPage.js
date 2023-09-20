import React from "react";
import LeftSide from "../../components/message/LeftSide";
import RightSide from "../../components/message/RightSide";

const Conversation = () => {
  return (
    <div className="container message d-flex">
      <div
        className="col-md-4 px-0 left_mess"
        style={{ borderRight: "2px solid rgb(243,243,247,0.45)" }}
      >
        <LeftSide />
      </div>

      <div className="col-md-8 px-0">
        <RightSide />
      </div>
    </div>
  );
};

export default Conversation;
