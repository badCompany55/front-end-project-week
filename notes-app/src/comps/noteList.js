import React from 'react';
import Note from './note.js';

const NoteList = props => {
  return (
    <div className="listCont">
      {props.notes.map(note => {
        return (
          <Note
            key={note._id}
            id={note._id}
            noteName={note.title}
            noteContent={note.textBody}
            noteDelete={props.delete}
          />
        );
      })}
    </div>
  );
};

export default NoteList;
