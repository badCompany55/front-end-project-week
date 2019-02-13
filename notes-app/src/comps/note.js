import React from 'react';
import {Link} from 'react-router-dom'

const Note = props => {
  const noteDeleteMeth = () => {
    props.noteDelete(props.id);
  };


  return (
    <div className="noteCont" >
      <i className="fas fa-trash-alt" onClick={noteDeleteMeth} />
			<Link to={`/note/${props.id}`}>
				<h1 className="noteName">{props.noteName}</h1>
			</Link>
      <p className="noteContent">{props.noteContent}</p>
    </div>
  );
};

export default Note;
