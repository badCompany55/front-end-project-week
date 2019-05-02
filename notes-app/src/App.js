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
    this.local = window.localStorage;
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
    let html = JSON.parse(this.local.getItem("notes"));
    // console.log(html);
    // this.setState({ htmlNotes: html });
    this.initialLoad();
  }

  refreshNotes = () => {
    this.initialLoad();
  };

  initialLoad = () => {
    axios
      .get("https://fe-notes.herokuapp.com/note/get/all")
      .then(res => {
        // this.setState({ defaultNotes: res.data });
        const raw = res.data;
        const html = this.state.htmlNotes.slice();
        let htmlIds = html.map(note => {
          return note._id;
        });

        let newHtmlIds = [];

        let newRaw = raw.filter(note => {
          if (htmlIds.includes(note._id)) {
            newHtmlIds.push(note._id);
          }
          if (!htmlIds.includes(note._id)) {
            return note;
          }
        });

        let newHtmls = html.filter(note => {
          if (newHtmlIds.includes(note._id)) {
            return note;
          }
        });

        newHtmls.forEach(note => {
          newRaw.push(note);
        });
        this.setState({ notes: newRaw });
      })
      .catch(err => {
        this.setState({ errorMsg: err });
      });
  };

  htmlFormatCheck = () => {
    const raw = this.state.notes.slice();
    const html = this.state.htmlNotes.slice();
    let htmlIds = html.map(note => {
      return note._id;
    });

    let newHtmlIds = [];

    let newRaw = raw.filter(note => {
      if (htmlIds.includes(note._id)) {
        newHtmlIds.push(note._id);
      }
      if (!htmlIds.includes(note._id)) {
        return note;
      }
    });

    let newHtmls = html.filter(note => {
      if (newHtmlIds.includes(note._id)) {
        return note;
      }
    });

    newHtmls.forEach(note => {
      newRaw.push(note);
    });
    this.setState({ notes: newRaw, htmlNotes: newHtmls });
    newHtmls = JSON.stringify(newHtmls);
    this.local.setItem("notes", newHtmls);
  };

  updateState = (note, htmlNote) => {
    let newNotes = this.state.notes.slice();
    let newHtmlNotes = this.state.htmlNotes.slice();
    newNotes.push(note);
    newHtmlNotes.push(htmlNote);
    this.setState({
      notes: newNotes,
      htmlNotes: newHtmlNotes,
      errorMsg: null
    });
    this.htmlFormatCheck();
  };

  sortState = notes => {
    this.setState({ notes: notes });
  };

  editState = (notes, htmlNotes) => {
    this.setState({ notes: notes, htmlNotes: htmlNotes });
    let localHtml = JSON.stringify(this.state.htmlNotes);
    this.local.setItem("notes", localHtml);
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
