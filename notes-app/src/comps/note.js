import React from "react";
import { Link } from "react-router-dom";

const Note = props => {
  const target = e => {
    props.etarget(e.target.id);
  };

  return (
    <div className="noteCont">
      <div className="editDelete">
        <Link to={`/notes/edit/${props.id}`}>
          <i className="fas fa-edit" />
        </Link>
        <i className="fas fa-trash-alt" id={props.id} onClick={target} />
      </div>
      <Link to={`/note/${props.id}`}>
        <h1
          className={
            props.currentResult === props.noteName + props.index
              ? "noteName highlight"
              : "noteName"
          }
        >
          <a id={props.noteName + props.index}>{props.noteName}</a>
        </h1>
      </Link>
      <p className="noteContent">{props.noteContent}</p>
    </div>
  );
};

export default Note;
