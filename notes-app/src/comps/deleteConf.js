import React from "react";

const DeleteConf = props => {
  const returnNotes = () => {
    if (props.location.pathname !== "/notes") {
      props.history.push("/notes");
    }
  };
  const noteDeleteMeth = () => {
    props.noteDelete();
    props.resetModal();
    returnNotes();
  };

  return (
    <div className={props.modal === false ? "deleteCont hidden" : "deleteCont"}>
      <div className="message">Are you sure you want to delete?</div>
      <div className="buttons">
        <button className="yes" onClick={noteDeleteMeth}>
          YES
        </button>
        <button className="no" onClick={props.resetModal}>
          NO
        </button>
      </div>
    </div>
  );
};

export default DeleteConf;
