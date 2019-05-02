import React from "react";
import { Link } from "react-router-dom";

const Note = props => {
  const target = e => {
    props.etarget(e.target.id);
  };

  return (
    <div className={props.dragging ? "noteCont dragging" : "noteCont"}>
      <div className="editDelete">
        <Link to={`/note/${props.id}/edit`}>
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
      <div
        className="noteContent"
        dangerouslySetInnerHTML={{ __html: props.noteContent }}
      />
    </div>
  );
};

export default Note;
