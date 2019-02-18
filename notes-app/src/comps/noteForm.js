import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      title: "",
      textBody: ""
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

  subHandle = e => {
    e.preventDefault();
    if (this.props.location.pathname.includes("new")) {
      if (this.state.title !== "" && this.state.textBody !== "") {
        const newNote = { ...this.state };
        axios
          .post("https://fe-notes.herokuapp.com/note/create", newNote)
          .then(res => {
            console.log(res);
            newNote._id = res.data.success;
            console.log(newNote);
            this.props.updateState(newNote);
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
          state = state.notes.map(note => {
            if (note._id === res.data._id) {
              note = res.data;
            }
            return note;
          });
          this.props.editState(state);
        })
        .catch(err => {
          console.log(err);
        });
      this.setState({ tags: [], title: "", textBody: "" });
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
              <label className="content" htmlFor="content">
                Content:{" "}
              </label>
              <textarea
                id="textBody"
                name="content"
                cols="30"
                rows="20"
                value={this.state.textBody}
                onChange={this.capInput}
              />
            </div>
            <div className="button">
              {this.props.location.pathname.includes("new") ? (
                <button>Add</button>
              ) : (
                <button>Submit</button>
              )}
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
