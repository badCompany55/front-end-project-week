import React from "react";
import { Link } from "react-router-dom";
import Search from "./search.js";

const Navigation = props => {
  return (
    <div className="navCont">
      <Search
        notes={props.notes}
        setResults={props.setResults}
        search={props.search}
        results={props.results}
        currentRes={props.currentRes}
      />
      <nav className="navbar">
        <Link to="/">
          <div className="home">HOME</div>
        </Link>
        <Link to="/notes">
          <div className="allNotes">All NOTES</div>
        </Link>
        <Link to="/notes/new">
          <div className="newNote">NEW NOTE</div>
        </Link>
      </nav>
    </div>
  );
};

export default Navigation;
