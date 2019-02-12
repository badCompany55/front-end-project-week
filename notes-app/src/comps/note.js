import React from 'react';

const Note = props => {
  const noteDeleteMeth = () => {
    props.noteDelete(props.id);
  };
  return (
    <div className="noteCont" onClick={noteDeleteMeth}>
      <i className="fas fa-trash-alt" />
      <h1 className="noteName">{props.noteName}</h1>
      <p className="noteContent">{props.noteContent}</p>
    </div>
  );
};

export default Note;
