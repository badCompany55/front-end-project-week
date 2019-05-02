import React from "react";
import Note from "./note.js";
import DeleteConf from "./deleteConf.js";
import { TimelineLite } from "gsap/all";

// class SelectedNote extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       note: null
//     };
//     this.tl = new TimelineLite({});
//   }
//
//   componentDidMount() {
//     this.tl.fromTo(this.state.note, 0.75, { opacity: 0 }, { opacity: 1 });
//   }
//
//   theNote = this.props.notes.find(note => {
//     return note._id === this.props.match.params.id;
//   });
//
//   idPass = target => {
//     this.props.stateId(target);
//   };
//
//   render() {
//     return (
//       <div className="singNoteCont" ref={div => (this.state.note = div)}>
//         <Note
//           key={this.theNote._id}
//           id={this.theNote._id}
//           noteName={this.theNote.title}
//           noteContent={this.theNote.textBody}
//           etarget={this.idPass}
//         />
//         <div className="deleteBox">
//           <DeleteConf
//             {...this.props}
//             noteDelete={this.props.noteDelete}
//             modal={this.props.modal}
//             resetModal={this.props.resetModal}
//           />
//         </div>
//       </div>
//     );
//   }
// }

const SelectedNote = props => {
  const theNote = props.notes.find(note => {
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

export default SelectedNote;
