import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "../styles/react-draft-wysiwyg.css";
import { convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { stateFromHTML } from "draft-js-import-html";

export class EditorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.timeout();
  }

  onEditorStateChange: Function = editorState => {
    this.setState({
      editorState
    });
  };

  timeout = () => {
    setTimeout(() => {
      this.checkState();
    }, 50);
  };

  checkState = props => {
    if (this.props.content) {
      let content = EditorState.createWithContent(
        stateFromHTML(this.props.content)
      );
      this.setState({ editorState: content });
    } else {
      let content = EditorState.createEmpty();
      this.setState({ editorState: content });
    }
  };

  currentInput = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const rawTxt = convertToRaw(contentState);
    const html = stateToHTML(contentState);

    let combinedText = rawTxt.blocks.map(note => {
      return note.text;
    });

    combinedText = combinedText.join(" ");
    this.props.setInput(combinedText, html);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="cont">
        <Editor
          {...this.props}
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          onChange={this.currentInput}
          toolbar={{
            options: [
              "blockType",
              "inline",
              "list",
              "link",
              "history",
              "embedded",
              "emoji",
              "image"
            ],
            inline: {
              options: ["bold", "italic", "underline", "strikethrough"]
            },

            list: { options: ["unordered", "ordered"] },
            link: { inDropdown: true },
            history: { inDropdown: true }
          }}
        />
        {/* <button onClick={this.currentInput}>submit</button> */}
      </div>
    );
  }
}
