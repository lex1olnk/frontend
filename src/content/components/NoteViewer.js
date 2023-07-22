import React, { useState, useEffect } from 'react';
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider
} from 'verbum';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { $generateHtmlFromNodes } from '@lexical/html';

function SetEditorPlugin({ setEditor }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!setEditor) return;
    setEditor(editor);
  }, [editor]);

  return null;
}

const onChange = (editorState, editor, setDesc) => {
  if (editor) {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
    });
    setDesc(editor.getEditorState());
  }
};

const NoteViewer = props => {
  const { setDesc } = props;
  const [editor, setEditor] = useState(null);

  return (
    <EditorComposer>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Описание
      </label>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
          <FontFamilyDropdown />
          <FontSizeDropdown />
          <Divider />
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <CodeFormatButton />
          <InsertLinkButton />
          <TextColorPicker />
          <BackgroundColorPicker />
          <TextFormatDropdown />
          <Divider />
          <InsertDropdown enablePoll={true} />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
        <SetEditorPlugin setEditor={setEditor} />
        <OnChangePlugin onChange={editorState => onChange(editorState, editor, setDesc)} />
      </Editor>
    </EditorComposer>
  );
};

export default NoteViewer;
