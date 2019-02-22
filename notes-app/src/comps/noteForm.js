import React from "react";
import axios from "axios";
import { EditorComponent } from "./editor.js";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      title: "",
      textBody: "",
      html: ""
    };
  }

  componentDidMount() {
    if (this.props.location.pathname.includes("edit")) {
      let note = this.props.newState.notes.find(n => {
        return n._id === this.props.match.params.id;
      });
      this.setState({
        tags: note.tags,
        title: note.title,
        textBody: note.textBody
      });
    }
  }

  capInput = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setInput = (text, html) => {
    this.setState({ textBody: text, html: html });
  };

  subHandle = e => {
    e.preventDefault();
    if (this.props.location.pathname.includes("new")) {
      if (this.state.title !== "" && this.state.textBody !== "") {
        const newNote = {
          tags: this.state.tags,
          title: this.state.title,
          textBody: this.state.textBody
        };
        const htmlNewNote = {
          tags: this.state.tags,
          title: this.state.title,
          textBody: this.state.html
        };

        axios
          .post("https://fe-notes.herokuapp.com/note/create", newNote)
          .then(res => {
            newNote._id = res.data.success;
            htmlNewNote._id = res.data.success;
            this.props.updateState(newNote, htmlNewNote);
            this.props.history.push("/notes");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        const errMsg = "Title and Body are Required";
        this.props.updateError(errMsg);
      }
      this.setState({ tags: [], title: "", textBody: "" });
    } else {
      axios
        .put(
          `https://fe-notes.herokuapp.com/note/edit/${
            this.props.match.params.id
          }`,
          {
            tags: [],
            title: this.state.title,
            textBody: this.state.textBody
          }
        )
        .then(res => {
          let state = { ...this.props.newState };
          let notes = state.notes.map(note => {
            if (note._id === res.data._id) {
              note = res.data;
            }
            return note;
          });
          let htmlNotes = state.notes.map(note => {
            if (note._id === res.data._id) {
              note = res.data;
              note.textBody = this.state.html;
            }
            return note;
          });
          this.props.editState(notes, htmlNotes);
        })
        .catch(err => {
          console.log(err);
        });
      // this.setState({ tags: [], title: "", textBody: "" });
    }
  };

  closeForm = () => {
    this.props.updateError(null);
    this.props.history.push("/notes");
  };

  render() {
    return (
      <div className="formCont">
        <div className="form">
          <div className="closeCont">
            <i className="fas fa-window-close" onClick={this.closeForm} />
          </div>
          <form className="noteForm" onSubmit={this.subHandle}>
            <div className="titleCont">
              <label className="title" htmlFor="title">
                Title:{" "}
              </label>
              <input
                id="title"
                type="text"
                value={this.state.title}
                onChange={this.capInput}
              />
            </div>
            <div className="contentCont">
              <EditorComponent
                setInput={this.setInput}
                {...this.props}
                content={this.state.textBody}
                // content="hello"
              />
            </div>
            <div className="button">
              {this.props.location.pathname.includes("new") ? (
                <button>Add</button>
              ) : (
                <button>Submit</button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
