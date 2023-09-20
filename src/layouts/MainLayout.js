import React from "react";
import { useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import StatusModal from "../components/StatusModal";
import SocketClient from "../SocketClient";
import Footer from "../components/footer/Footer";

function MainLayout() {
  const { status, modal, theme } = useSelector((state) => state);

  return (
    <>
      <input type="checkbox" id="theme" />
      <div
        className={`App ${(status || modal) && "mode"} ${
          theme ? "white-theme" : ""
        }`}
      >
        <div className="main">
          <Header />
          {status && <StatusModal />}
          <SocketClient />

          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MainLayout;
