import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";

const NoteList = props => {
  const idPass = target => {
    props.stateId(target);
  };

  const sortAscend = () => {
    const titles = props.notes.map(note => {
      return note.title;
    });
    let sortedA = titles.sort();
    let finalSort = [];
    sortedA.forEach(title => {
      props.notes.forEach(note => {
        if (note.title === title) {
          finalSort.push(note._id);
        }
      });
    });
    let finalNoDups = [];
    finalSort.forEach(id => {
      if (!finalNoDups.includes(id)) {
        finalNoDups.push(id);
      }
    });

    let theFinal = [];
    finalNoDups.forEach(id => {
      props.notes.forEach(note => {
        if (note._id === id) {
          theFinal.push(note);
        }
      });
    });

    props.sortNotes(theFinal);
  };

  const sortDescend = () => {
    const titles = props.notes.map(note => {
      return note.title;
    });
    let sortedA = titles.sort();
    let finalSort = [];
    sortedA.forEach(title => {
      props.notes.forEach(note => {
        if (note.title === title) {
          finalSort.push(note._id);
        }
      });
    });
    let finalNoDups = [];
    finalSort.forEach(id => {
      if (!finalNoDups.includes(id)) {
        finalNoDups.push(id);
      }
    });

    let theFinal = [];
    finalNoDups.forEach(id => {
      props.notes.forEach(note => {
        if (note._id === id) {
          theFinal.push(note);
        }
      });
    });

    let theOtherFinal = theFinal.reverse();

    props.sortNotes(theOtherFinal);
  };

  const theDefault = () => {
    props.refresh();
  };

  return (
    <div className="listCont">
      <div className="sorting">
        <i className="fas fa-arrow-circle-up" onClick={sortAscend} />
        <i className="fas fa-home" onClick={theDefault} />
        <i className="fas fa-arrow-circle-down" onClick={sortDescend} />
      </div>
      {props.notes.map((note, index) => {
        return (
          <Note
            key={note._id}
            id={note._id}
            noteName={note.title}
            noteContent={note.textBody}
            etarget={idPass}
            currentResult={props.currentResult}
            index={index}
          />
        );
      })}
      <div className="deleteBox">
        <DeleteConf
          {...props}
          noteDelete={props.noteDelete}
          modal={props.modal}
          resetModal={props.resetModal}
        />
      </div>
    </div>
  );
};

export default NoteList;
