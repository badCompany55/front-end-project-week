import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";
import { TimelineLite } from "gsap/all";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
    this.notes = [];
    this.tl = new TimelineLite({});
    // this.tm = new TweenLite({});
  }

  componentDidMount() {
    this.tl.fromTo(this.notes, 0.75, { opacity: 0 }, { opacity: 1 });
  }

  idPass = target => {
    this.props.stateId(target);
  };

  sortAscend = () => {
    const titles = this.props.notes.map(note => {
      return note.title;
    });
    let sortedA = titles.sort();
    let finalSort = [];
    sortedA.forEach(title => {
      this.props.notes.forEach(note => {
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
      this.props.notes.forEach(note => {
        if (note._id === id) {
          theFinal.push(note);
        }
      });
    });

    this.props.sortNotes(theFinal);
    this.tl.fromTo(this.notes, 0.75, { opacity: 0 }, { opacity: 1 });
  };

  sortDescend = () => {
    const titles = this.props.notes.map(note => {
      return note.title;
    });
    let sortedA = titles.sort();
    let finalSort = [];
    sortedA.forEach(title => {
      this.props.notes.forEach(note => {
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
      this.props.notes.forEach(note => {
        if (note._id === id) {
          theFinal.push(note);
        }
      });
    });

    let theOtherFinal = theFinal.reverse();
    this.props.sortNotes(theOtherFinal);
    this.tl.fromTo(this.notes, 0.75, { opacity: 0 }, { opacity: 1 });
  };

  theDefault = () => {
    this.props.refresh();
    this.tl.fromTo(this.notes, 0.75, { opacity: 0 }, { opacity: 1 });
  };

  onDragEnd = result => {
    let notes = this.props.notes;
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
    this.props.sortState(newNotes);
  };

  render() {
    return (
      <div className="listCont">
        <div className="sorting">
          <i className="fas fa-arrow-circle-up" onClick={this.sortAscend} />
          <i className="fas fa-home" onClick={this.theDefault} />
          <i className="fas fa-arrow-circle-down" onClick={this.sortDescend} />
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {provided => (
              <div className="droppableCont" ref={provided.innerRef}>
                {this.props.notes.map((note, index) => {
                  return (
                    <Draggable
                      key={note._id}
                      draggableId={note._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div ref={div => (this.notes[index] = div)}>
                            <Note
                              key={note._id}
                              id={note._id}
                              noteName={note.title}
                              noteContent={note.textBody}
                              etarget={this.idPass}
                              currentResult={this.props.currentResult}
                              index={index}
                              dragging={snapshot.isDragging}
                            />
                          </div>
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
            {...this.props}
            noteDelete={this.props.noteDelete}
            modal={this.props.modal}
            resetModal={this.props.resetModal}
          />
        </div>
      </div>
    );
  }
}
export default NoteList;
