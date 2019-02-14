import React from "react";
import { Link } from "react-router-dom";

const Note = props => {
  const target = e => {
    props.etarget(e.target.id);
  };
  return (
    <div className="noteCont">
      <Link to={`/notes/edit/${props.id}`}>
        <i className="fas fa-edit" />
      </Link>
      <i className="fas fa-trash-alt" id={props.id} onClick={target} />
      <Link to={`/note/${props.id}`}>
        <h1 className="noteName">{props.noteName}</h1>
      </Link>
      <p className="noteContent">{props.noteContent}</p>
    </div>
  );
};

export default Note;
