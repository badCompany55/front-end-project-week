import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  const onDragEnd = result => {
    let notes = props.notes;
    let movedNote = notes.slice(result.source.index, result.source.index + 1);
    let workingNotes = notes.filter(note => {
      if (note._id !== movedNote[0]._id) {
        return note;
      }
    });
    let newNotes = [
      ...workingNotes.slice(0, result.destination.index),
      movedNote[0],
      ...workingNotes.slice(result.destination.index)
    ];
    // console.log("working:", workingNotes);
    // console.log(notes.length, workingNotes.length);
    // console.log("new:", newNotes);
    props.sortState(newNotes);
  };

  return (
    <div className="listCont">
      <div className="sorting">
        <i className="fas fa-arrow-circle-up" onClick={sortAscend} />
        <i className="fas fa-home" onClick={theDefault} />
        <i className="fas fa-arrow-circle-down" onClick={sortDescend} />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div ref={provided.innerRef}>
              {props.notes.map((note, index) => {
                return (
                  <Draggable
                    key={note._id}
                    draggableId={note._id}
                    index={index}
                  >
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Note
                          key={note._id}
                          id={note._id}
                          noteName={note.title}
                          noteContent={note.textBody}
                          etarget={idPass}
                          currentResult={props.currentResult}
                          index={index}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
