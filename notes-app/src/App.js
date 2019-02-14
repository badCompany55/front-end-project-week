import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import { Route } from "react-router-dom";
import NoteList from "./comps/noteList.js";
import Form from "./comps/noteForm.js";
import SelectedNote from "./comps/viewSelectedNote.js";
import Navigation from "./comps/nav.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      deletebox: false,
      deleteItem: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateState = note => {
    let newNotes = { ...this.state };
    newNotes.notes.push(note);
    this.setState(newNotes);
  };

  editState = notes => {
    this.setState({ notes: notes });
  };

  deleteNote = () => {
    const id = this.state.deleteItem;
    let newNotes = { ...this.state };
    axios
      .delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(res => {
        let secondNewNotes = newNotes.notes.filter(note => {
          return note._id !== id;
        });
        this.setState({ notes: secondNewNotes });
      })
      .catch(err => {
        console.log(err);
      });
  };

  setStateId = id => {
    this.setState({ deletebox: true, deleteItem: id });
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={Navigation} />
        <Route
          path="/notes"
          render={props => (
            <NoteList
              {...props}
              notes={this.state.notes}
              stateId={this.setStateId}
              noteDelete={this.deleteNote}
              modal={this.state.deletebox}
            />
          )}
        />
        <Route
          path="/new"
          render={props => <Form {...props} updateState={this.updateState} />}
        />
        <Route
          path="/edit/:id"
          render={props => (
            <Form {...props} newState={this.state} editState={this.editState} />
          )}
        />
        <Route
          path="/note/:id"
          render={props => (
            <SelectedNote
              {...props}
              notes={this.state.notes}
              delete={this.deleteNote}
              noteId={this.state.deleteItem}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
