import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import NoteList from './comps/noteList.js';
import Form from './comps/noteForm.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }
  componentDidMount() {
    axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(res => {
        this.setState({notes: res.data});
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateState = note => {
    let newNotes = {...this.state};
    newNotes.notes.push(note);
    this.setState(newNotes);
  };

  render() {
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <NoteList {...props} notes={this.state.notes} />}
        />
        <Route
          path="/new"
          render={props => <Form {...props} updateState={this.updateState} />}
        />
      </div>
    );
  }
}

export default App;
