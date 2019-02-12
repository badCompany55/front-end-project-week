import React from 'react';

const Note = props => {
  return (
    <div className="noteCont">
      <h1 className="noteName">{props.noteName}</h1>
      <p className="noteContent">{props.noteContent}</p>
    </div>
  );
};

export default Note;
