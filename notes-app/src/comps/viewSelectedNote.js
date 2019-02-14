import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";

const SelectedNote = props => {
  let theNote = props.notes.find(note => {
    return note._id === props.match.params.id;
  });

  const idPass = target => {
    props.stateId(target);
  };

  return (
    <div className="singNoteCont">
      <Note
        key={theNote._id}
        id={theNote._id}
        noteName={theNote.title}
        noteContent={theNote.textBody}
        etarget={idPass}
      />
      <DeleteConf
        {...props}
        noteDelete={props.noteDelete}
        modal={props.modal}
        resetModal={props.resetModal}
      />
    </div>
  );
};

export default SelectedNote;
