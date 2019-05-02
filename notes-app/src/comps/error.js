import React from "react";

const ErrMsg = props => {
  return (
    <div className="errMsg">
      <div className="msg">{props.errorMsg}</div>
    </div>
  );
};

export default ErrMsg;
