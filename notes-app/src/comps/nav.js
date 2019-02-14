import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navCont">
      <nav className="navbar">
        <Link to="/">
          <div className="home">HOME</div>
        </Link>
        <Link to="/notes">
          <div className="allNotes">NOTES</div>
        </Link>
        <Link to="/notes/new">
          <div className="newNote">NEW NOTE</div>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
