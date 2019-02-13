import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {Route} from 'react-router-dom';
import NoteList from './comps/noteList.js';
import Form from './comps/noteForm.js';
import SelectedNote from './comps/viewSelectedNote.js'

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

  deleteNote = id => {
    let newNotes = {...this.state};
    axios
      .delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(res => {
        console.log(res);
        let secondNewNotes = newNotes.notes.filter(note => {
          return note._id !== id;
        });
        this.setState({notes: secondNewNotes});
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact path="/"
          render={props => (
            <NoteList
              {...props}
              notes={this.state.notes}
              delete={this.deleteNote}
            />
          )}
        />
        <Route
          path="/new"
          render={props => <Form {...props} updateState={this.updateState} />}
        />
				<Route 
					path="/note/:id" 
					render={props => <SelectedNote {...props} notes={this.state.notes} delete={this.deleteNote}/>}
				/>
      </div>
    );
  }
}

export default App;
