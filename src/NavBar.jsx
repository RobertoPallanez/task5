import React from "react";
import "./App.css";

function NavBar() {
  return (
    <div className="navbarBox">
      <div className="logoBox">
        <img className="bookIcon" src="./bookicon.svg" />
        Bookipedia
      </div>
      <div className="slogan">Your Best Resource to consult books online</div>
    </div>
  );
}

export default NavBar;
