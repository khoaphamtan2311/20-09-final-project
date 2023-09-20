import React from "react";
import Menu from "../header/Menu";

function Footer() {
  return (
    <div className="footer d-block d-md-none">
      <nav
        className=" navbar-expand-lg navbar-light align-middle"
        style={{ position: "relative", padding: "0.5rem 1rem" }}
      >
        <Menu />
      </nav>
    </div>
  );
}

export default Footer;
