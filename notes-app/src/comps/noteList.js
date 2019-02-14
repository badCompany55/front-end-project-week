import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";

const NoteList = props => {
  const idPass = target => {
    props.stateId(target);
  };

  return (
    <div className="listCont">
      {props.notes.map(note => {
        return (
          <Note
            key={note._id}
            id={note._id}
            noteName={note.title}
            noteContent={note.textBody}
            etarget={idPass}
          />
        );
      })}

      <DeleteConf noteDelete={props.noteDelete} modal={props.modal} />
    </div>
  );
};

export default NoteList;
