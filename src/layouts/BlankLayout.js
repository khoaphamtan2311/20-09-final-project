import React from "react";
import { Outlet } from "react-router-dom";

function BlankLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default BlankLayout;
