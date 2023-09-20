import React from "react";
import LeftSideBar from "../components/home/LeftSideBar";
import RightSideBar from "../components/home/RightSideBar";
import Search from "../components/header/Search";

function search() {
  return (
    <div className="d-flex">
      <div className="col-md-2 px-0 d-none d-md-block">
        <LeftSideBar />
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-5 col-12 feed ">
        <Search />
      </div>
      <div className="col-md-1 d-none d-md-block" />
      <div className="col-md-3 d-none d-md-block feed">
        <RightSideBar />
      </div>
    </div>
  );
}

export default search;
