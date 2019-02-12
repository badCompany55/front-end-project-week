import React from 'react';
import axios from 'axios';

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      title: '',
      textBody: '',
    };
  }

  capInput = e => {
    this.setState({[e.target.id]: e.target.value});
  };

  subHandle = e => {
    e.preventDefault();
    const newNote = {...this.state};
    console.log(newNote);
    axios
      .post('https://fe-notes.herokuapp.com/note/create', newNote)
      .then(res => {
        console.log(res);
        newNote._id = res.data.success;
        console.log(newNote);
        this.props.updateState(newNote);
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({tags: [], title: '', content: ''});
  };

  render() {
    return (
      <div className="formCont">
        <form className="noteForm" onSubmit={this.subHandle}>
          <div className="titleCont">
            <label className="title" htmlFor="title">
              Title:{' '}
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
              Content:{' '}
            </label>
            <textarea
              id="textBody"
              name="content"
              cols="30"
              rows="10"
              value={this.state.content}
              onChange={this.capInput}
            />
          </div>
          <button>Add</button>
        </form>
      </div>
    );
  }
}

export default Form;
