import React from "react";
import "./App.css";

function Headers() {
  return (
    <div className="headersBox">
      <div className="headerNumber">#</div>
      <div className="headerItem">ISBN</div>
      <div className="headerItem">Title</div>
      <div className="headerItem">Author(s)</div>
      <div className="headerItem">Publisher</div>
    </div>
  );
}

export default Headers;
