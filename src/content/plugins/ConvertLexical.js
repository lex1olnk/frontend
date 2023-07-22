import { createEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

const ConvertLexical = props => {
  const { descString, setDesc } = props;
  const editor = createEditor();
  const editorState = editor.parseEditorState(descString);
  editor.setEditorState(editorState);

  editor.update(() => {
    const htmlString = $generateHtmlFromNodes(editor, null);
    setDesc(htmlString);
  });

  return;
};

export default ConvertLexical;
