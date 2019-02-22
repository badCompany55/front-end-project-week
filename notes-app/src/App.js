import React, { Component } from "react";
import "./App.scss";
import axios from "axios";
import { Route } from "react-router-dom";
import NoteList from "./comps/noteList.js";
import Form from "./comps/noteForm.js";
import SelectedNote from "./comps/viewSelectedNote.js";
import Navigation from "./comps/nav.js";
import ErrMsg from "./comps/error.js";
import Home from "./comps/home.js";
import { EditorComponent } from "./comps/editor.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      htmlNotes: [],
      deletebox: false,
      deleteItem: "",
      errorMsg: null,
      results: [],
      currentResult: ""
    };
  }

  componentDidMount() {
    // axios
    //   .get("https://fe-notes.herokuapp.com/note/get/all")
    //   .then(res => {
    //     this.setState({ defaultNotes: res.data });
    //     this.htmlFormat();
    //   })
    //   .catch(err => {
    //     this.setState({ errorMsg: err });
    //   });
    // this.timeout();
    // this.htmlFormat();
    this.initialLoad();
  }

  refreshNotes = () => {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  };

  initialLoad = () => {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        // this.setState({ defaultNotes: res.data });
        const raw = res.data;
        const html = this.state.htmlNotes.slice();
        let combinedCheck = [];
        raw.forEach(note => {
          if (html.length > 0) {
            html.forEach(htmlNote => {
              if (note._id === htmlNote._id) {
                combinedCheck.push(htmlNote);
              }
            });
          } else {
            combinedCheck.push(note);
          }
        });
        this.setState({ notes: combinedCheck });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  };

  htmlFormatCheck = () => {
    const raw = this.state.notes.slice();
    const html = this.state.htmlNotes.slice();
    let combinedCheck = [];
    raw.forEach(note => {
      if (html.length > 0) {
        html.forEach(htmlNote => {
          if (note._id === htmlNote._id) {
            combinedCheck.push(htmlNote);
          } else {
            combinedCheck.push(note);
          }
        });
      } else {
        combinedCheck.push(note);
      }
    });
    console.log(combinedCheck);
    this.setState({ notes: combinedCheck });
  };

  updateState = (note, htmlNote) => {
    let newNotes = { ...this.state };
    newNotes.notes.push(note);
    newNotes.htmlNotes.push(htmlNote);
    this.setState({
      notes: newNotes.notes,
      htmlNotes: newNotes.htmlNotes,
      errorMsg: null
    });
    this.htmlFormatCheck();
  };

  sortState = notes => {
    this.setState({ notes: notes });
  };

  editState = (notes, htmlNotes) => {
    this.setState({ notes: notes, htmlNotes: htmlNotes });
    console.log(this.state.htmlNotes);
    this.htmlFormatCheck();
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
        <Route exact path="/" component={Home} />
        <Route
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
          path="/note/:id/edit"
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
        <Route path="/editor" component={EditorComponent} />
      </div>
    );
  }
}

export default App;
