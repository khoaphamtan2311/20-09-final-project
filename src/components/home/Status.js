import React from "react";
import Avatar from "../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";

const Status = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="status d-flex">
      <Avatar src={auth?.user?.avatar} size="big-avatar" />

      <button
        className="statusBtn flex-fill mx-3 p-3 text-break overflow-hidden"
        onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
      >
        @{auth?.user?.username}, what is on your mind?
      </button>
    </div>
  );
};

export default Status;
