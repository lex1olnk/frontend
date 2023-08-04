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

// function SetEditorPlugin({ setEditor }) {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     if (!setEditor) return;
//     setEditor(editor);
//   }, [editor]);

//   return null;
// }

const onChange = (editorState, editor, setDesc) => {
  if (editor) {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor, null);
    });
    setDesc({ target: { name: 'desc', value: editor.getEditorState() } });
  }
};

const NoteViewer = props => {
  const { editor, setDesc } = props;
  return (
    <EditorComposer initialEditorState={editor}>
      <Editor>
        <ToolbarPlugin defaultFontSize="16px">
          <BoldButton />
          <ItalicButton />
          <UnderlineButton />
          <InsertLinkButton />
          <TextColorPicker />
          <BackgroundColorPicker />
          <TextFormatDropdown />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
        {/* <SetEditorPlugin /> */}
        <OnChangePlugin
          onChange={(editorState, editor) => onChange(editorState, editor, setDesc)}
        />
      </Editor>
    </EditorComposer>
  );
};

export default NoteViewer;
