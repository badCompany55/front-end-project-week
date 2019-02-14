import React from "react";

const DeleteConf = props => {
  const noteDeleteMeth = () => {
    props.noteDelete();
  };

  return (
    <div className={props.modal === false ? "deleteCont hidden" : "deleteCont"}>
      {console.log(props.modal)}
      <div className="message">Are you sure you want to delete?</div>
      <button className="yes" onClick={noteDeleteMeth}>
        YES
      </button>
      <button className="no">NO</button>
    </div>
  );
};

export default DeleteConf;
