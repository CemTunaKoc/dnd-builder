import React from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import { formats, modules } from './textEditorConstants';
import { fontSizes } from '../../constants/fonts';
import 'react-quill/dist/quill.snow.css';

const Size = ReactQuill.Quill.import('attributors/style/size');
Size.whitelist = fontSizes.map(s => `${s}px`);
ReactQuill.Quill.register(Size, true);

class QuillEditor extends React.PureComponent {
  constructor(props) {
    super(props);

    this.quill = React.createRef();
  }

  componentDidMount() {
    if (this.quill.current !== null) {
      const { content } = this.props;
      const editor = this.quill.current.getEditor();
      editor.setSelection(0, content.length);
    }
  }

  componentWillUnmount() {
    this.saveAndQuit();
  }

  saveAndQuit = () => {
    const { content, handleSave, setIsTextEditorOpen } = this.props;
    setIsTextEditorOpen(false);
    handleSave(content);
  }

  handleKeyDown = e => {
    e.stopPropagation();
    if (e.keyCode === 27) {
      this.saveAndQuit();
    }
  }

  render() {
    const {
      content,
      placeholder,
      setContent,
    } = this.props;

    return (
      <div
        className="f-all"
        onKeyDown={this.handleKeyDown}
      >
        <ReactQuill
          ref={this.quill}
          formats={QuillEditor.formats}
          modules={QuillEditor.modules}
          onChange={setContent}
          placeholder={placeholder}
          preserveWhitespace
          value={content}
        />
      </div>
    );
  }
}

QuillEditor.modules = modules;
QuillEditor.formats = formats;

QuillEditor.propTypes = {
  content: PropTypes.string,
  handleSave: PropTypes.func,
  placeholder: PropTypes.string,
  setContent: PropTypes.func,
  setIsTextEditorOpen: PropTypes.func,
};

QuillEditor.defaultProps = {
  content: '',
  handleSave: () => {},
  placeholder: 'Click to edit text',
  setContent: () => {},
  setIsTextEditorOpen: () => {},
};

export default QuillEditor;
