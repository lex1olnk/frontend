import React, { useEffect, useState } from 'react';
import {
  $createParagraphNode,
  createEditor,
  $getSelection,
  $getRoot,
  $isParagraphNode
} from 'lexical';
import { toJS } from 'mobx';

import NoteViewer from '../NoteViewer';
import { ReactComponent as SubmitIcon } from '../../icons/submit.svg';
import { ReactComponent as EditIcon } from '../../icons/edit.svg';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const updateEditorState = props => {
  const { text, setParagraph } = props;
  console.log(text);

  text.read(() => {
    const root = $getRoot();
    const children = root.getChildren()[0];
    setParagraph(children);
  });

  return null;
};

const TextEditor = props => {
  const { text, setIsEdit } = props;
  const translated = createEditor({
    editable: true
  });
  const [editor, setEditor] = useState('');
  const [edit, setEdit] = useState(false);
  const [paragraph, setParagraph] = useState('');
  const [num, setNum] = useState(0);
  const editorState = translated.getEditorState();
  const nums = 1;

  console.log(translated.getEditorState());
  const insertParagraph = () => {
    updateEditorState({ text: editor, setParagraph });

    console.log('done');
    translated.update(() => {
      const root = $getRoot();
      const para = $createParagraphNode();
      console.log(para, paragraph);
    });

    setEditor('');
    setEdit(!edit);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-md pb-4">
      <div className="bg-slate-100 border-b-2">
        <div className="w-full mx-auto px-8 py-4 text-xl">Импортировать текст</div>
      </div>
      <div className="w-full mx-auto py-4 px-8">
        <span className="text-xl">Источник</span>
        <div className="mt-4 flex flex-row justify-between min-h-[100px]">
          <div className="w-[900px] h-full border-2 rounded-md p-2 text-base">{text}</div>
          {!edit ? (
            <div className="relative flex flex-col justify-between w-[900px] min-h-4 border-2 rounded-md p-2 text-base">
              {JSON.stringify(translated.getEditorState())}
              <EditIcon className="absolute -left-8" onClick={() => setEdit(!edit)} />
            </div>
          ) : (
            <div className="w-[900px] relative my-0">
              <NoteViewer setDesc={setEditor} editor={editor} />
              <SubmitIcon className="absolute bottom-8 -left-8" onClick={() => insertParagraph()} />
              <CloseIcon
                className="absolute bottom-0 -left-8"
                onClick={() => {
                  setEdit(!edit);
                  setEditor('');
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="ChapterTextButtons">
        <button onClick={() => setIsEdit(currentState => !currentState)}>Назад</button>
        <button onClick={() => setIsEdit(currentState => !currentState)}>
          Вернуться на страницу
        </button>
      </div>
    </div>
  );
};

const TextRead = props => {
  const { text, setText, setIsEdit } = props;
  return (
    <div className="w-full mx-auto bg-white rounded-md pb-4">
      <div className="bg-slate-100 rounded-t-md border-b-2">
        <div className="w-[1144px] mx-auto px-4 py-4 text-xl">Импортировать текст</div>
      </div>
      <div className="w-[1144px] mx-auto py-4 pb-8">
        <span className="mx-auto text-lg ml-4">Набрать текст</span>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="text-sm flex my-2 w-full h-40 outline-none border-2 transition duration-400 ease-in rounded-md p-4 focus:border-slate-500"
        />
        <span className="ml-4">
          Пожалуйста, не более 2 МБ. Тексты большего размера разбейте на отдельные главы.
        </span>
      </div>
      <div className="ChapterTextButtons">
        <button onClick={() => setIsEdit(currentState => !currentState)}>Назад</button>
        <button onClick={() => setIsEdit(currentState => !currentState)}>Далее</button>
      </div>
    </div>
  );
};

const AddChapterText = () => {
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="bg-gray-200 h-screen pt-4">
      {!isEdit ? (
        <TextRead text={text} setText={setText} setIsEdit={setIsEdit} />
      ) : (
        <TextEditor text={text} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};

export default AddChapterText;
