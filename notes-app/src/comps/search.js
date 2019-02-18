import React from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      counter: 1
    };
  }

  capInput = e => {
    this.setState({ input: e.target.value });
    const copyOfNotes = this.props.notes.map((note, index) => {
      return note.title + index;
    });
    let results = copyOfNotes.filter(note => {
      if (note.toLowerCase().includes(this.state.input.toLowerCase())) {
        return note;
      }
    });
    this.props.setResults(results);
  };

  search = e => {
    e.preventDefault();
    this.props.search();
  };

  cycleSearch = () => {
    let counter = this.state.counter;
    if (counter >= this.props.results.length) {
      counter = 0;
    }
    window.location.hash = this.props.results[counter];
    console.log(this.props.results[counter]);
    counter++;
    this.setState({ counter: counter });
    this.props.currentRes(this.props.results[counter - 1]);
  };

  render() {
    return (
      <div className="searchCont">
        <label className="searchLabel" htmlFor="searchLabel">
          Search
        </label>
        <input className="searchInput" type="text" onChange={this.capInput} />
        <button className="seachButt" onClick={this.search}>
          Search
        </button>
        <button className="next" onClick={this.cycleSearch}>
          Next
        </button>
        <button className="clear">Clear</button>
      </div>
    );
  }
}

export default Search;
