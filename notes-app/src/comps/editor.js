import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../styles/react-draft-wysiwyg.css";
import { convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateToMarkdown } from "draft-js-export-markdown";

export class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState
    });
  };

  currentInput = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const rawTxt = convertToRaw(contentState);
    const html = stateToHTML(contentState);

    let combinedText = rawTxt.blocks.map(note => {
      return note.text;
    });

    combinedText = combinedText.join(" ");
    console.log(combinedText);
    console.log(rawTxt);
    console.log(html);
    this.props.setInput(combinedText, html);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="cont">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          onChange={this.currentInput}
        />
        {/* <button onClick={this.currentInput}>submit</button> */}
      </div>
    );
  }
}
