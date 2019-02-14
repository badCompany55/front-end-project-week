import React from "react";

const DeleteConf = props => {
  const returnNotes = () => {
    props.history.push("/notes");
  };
  const noteDeleteMeth = () => {
    props.noteDelete();
    props.resetModal();
    returnNotes();
  };

  return (
    <div className={props.modal === false ? "deleteCont hidden" : "deleteCont"}>
      <div className="message">Are you sure you want to delete?</div>
      <button className="yes" onClick={noteDeleteMeth}>
        YES
      </button>
      <button className="no" onClick={props.resetModal}>
        NO
      </button>
    </div>
  );
};

export default DeleteConf;
