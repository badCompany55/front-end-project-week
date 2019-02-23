import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";
import { TimelineLite } from "gsap/all";

class SelectedNote extends React.Component {
  constructor(props) {
    super(props);
    this.note = null;
    this.tl = new TimelineLite({});
  }

  componentDidMount() {
    this.tl.fromTo(this.note, 0.75, { opacity: 0 }, { opacity: 1 });
  }

  theNote = this.props.notes.find(note => {
    return note._id === this.props.match.params.id;
  });

  idPass = target => {
    this.props.stateId(target);
  };

  render() {
    return (
      <div className="singNoteCont" ref={div => (this.note = div)}>
        <Note
          key={this.theNote._id}
          id={this.theNote._id}
          noteName={this.theNote.title}
          noteContent={this.theNote.textBody}
          etarget={this.idPass}
        />
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

export default SelectedNote;
