import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import { Route } from "react-router-dom";
import NoteList from "./comps/noteList.js";
import Form from "./comps/noteForm.js";
import SelectedNote from "./comps/viewSelectedNote.js";
import Navigation from "./comps/nav.js";
import ErrMsg from "./comps/error.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      deletebox: false,
      deleteItem: "",
      errorMsg: null,
      results: [],
      currentResult: ""
    };
  }

  componentDidMount() {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        this.setState({ notes: res.data, defaultNotes: res.data });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  }

  refreshNotes = () => {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        this.setState({ notes: res.data, defaultNotes: res.data });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  };

  updateState = note => {
    let newNotes = { ...this.state };
    newNotes.notes.push(note);
    this.setState({
      notes: newNotes.notes,
      defaultNotes: newNotes.notes,
      errorMsg: null
    });
  };

  sortState = notes => {
    this.setState({ notes: notes });
  };

  editState = notes => {
    this.setState({ notes: notes, defaultNotes: notes });
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
        this.setState({ notes: secondNewNotes, defaultNotes: secondNewNotes });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  };

  setStateId = id => {
    this.setState({ deletebox: true, deleteItem: id });
  };

  resetModal = () => {
    this.setState({ deletebox: false, deleteItem: "" });
  };

  updateError = msg => {
    this.setState({ errorMsg: msg });
  };

  updateResults = res => {
    this.setState({ results: res });
  };

  updateCurrentRes = res => {
    this.setState({ currentResult: res });
  };

  setLocation = () => {
    this.setState({ currentResult: this.state.results[0] });
    window.location.hash = this.state.results[0];
  };

  render() {
    return (
      <div className="App">
        {this.state.errorMsg ? (
          <Route
            path="/"
            render={props => (
              <ErrMsg {...props} errorMsg={this.state.errorMsg} />
            )}
          />
        ) : null}
        <div className="container">
          <Route
            path="/"
            render={props => (
              <Navigation
                notes={this.state.notes}
                results={this.state.results}
                setResults={this.updateResults}
                search={this.setLocation}
                currentRes={this.updateCurrentRes}
              />
            )}
          />
        </div>
        <div className="spacer" />
        <Route
          exact
          path="/notes"
          render={props => (
            <NoteList
              {...props}
              notes={this.state.notes}
              stateId={this.setStateId}
              noteDelete={this.deleteNote}
              modal={this.state.deletebox}
              resetModal={this.resetModal}
              currentResult={this.state.currentResult}
              sortNotes={this.sortState}
              refresh={this.refreshNotes}
              onDragEnd={this.onDragEnd}
							sortState={this.sortState}
            />
          )}
        />
        <Route
          path="/notes/new"
          render={props => (
            <Form
              {...props}
              updateState={this.updateState}
              updateError={this.updateError}
            />
          )}
        />
        <Route
          path="/notes/edit/:id"
          render={props => (
            <Form
              {...props}
              newState={this.state}
              editState={this.editState}
              updateError={this.updateError}
            />
          )}
        />
        <Route
          path="/note/:id"
          render={props => (
            <SelectedNote
              {...props}
              notes={this.state.notes}
              stateId={this.setStateId}
              noteDelete={this.deleteNote}
              modal={this.state.deletebox}
              resetModal={this.resetModal}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
