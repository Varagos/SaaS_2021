import React from "react";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function GlobalNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="https://react-bootstrap.github.io/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        AskMEAnything
      </Navbar.Brand>
    </Navbar>
  );
}
export default GlobalNavbar;
