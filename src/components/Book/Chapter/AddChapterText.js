import React, { useEffect, useState } from 'react';
import { toJS } from 'mobx';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';

import { ReactComponent as SubmitIcon } from '../../../icons/submit.svg';
import { ReactComponent as EditIcon } from '../../../icons/edit.svg';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';
import { updateChapterText } from '../../../actions/chapterApi';

const updateEditorState = props => {
  const { text, setParagraph } = props;

  text.read(() => {
    const root = $getRoot();
    const children = root.getChildren()[0];
    setParagraph(children);
  });

  return null;
};

const ParagraphEditor = props => {
  const {
    text = '',
    paragraph = {},
    edit = false,
    editIndex,
    insertParagraph,
    setEdit,
    setEditor,
    num,
    index
  } = props;
  return (
    <div className="mt-4 flex flex-row justify-between min-h-[100px]">
      <div className=" w-[calc(50%_-_20px)] h-full border-2 rounded-md p-2 text-base">{text}</div>
      {edit && num === index ? (
        <div className="w-[calc(50%_-_20px)] relative my-0">
          <SubmitIcon
            className="absolute bottom-8 -left-8"
            onClick={() => insertParagraph(index)}
          />
          <CloseIcon
            className="absolute bottom-0 -left-8"
            onClick={() => {
              setEdit(!edit);
              setEditor('');
            }}
          />
        </div>
      ) : (
        <div className="relative flex flex-col justify-between w-[calc(50%_-_20px)] min-h-[100px] border-2 rounded-md p-2 text-base">
          {paragraph?.html && parse(paragraph.html)}
          <EditIcon className="absolute -left-8" onClick={() => editIndex(index)} />
        </div>
      )}
    </div>
  );
};

const TextEditor = props => {
  const { text, setIsEdit } = props;
  const originalParagraphs = text.split('\n').filter(txt => txt && true); //split up
  const [translated, setTranslated] = useState({});
  const [paragraphs, setParagraphs] = useState([]);
  const [editor, setEditor] = useState('');
  const [edit, setEdit] = useState(false);
  const [num, setNum] = useState(0);
  const { book, id } = useParams();

  return (
    <div className="w-full mx-auto bg-white rounded-md pb-4">
      <div className="bg-slate-100 border-b-2">
        <div className="w-full mx-auto px-8 py-4 text-xl">Импортировать текст</div>
      </div>
      <div className="h-full w-full mx-auto py-4 px-8">
        <span className="text-xl">Источник</span>
        {originalParagraphs.map((text, index) => (
          <ParagraphEditor
            text={text}
            edit={edit}
            setEdit={setEdit}
            index={index}
            num={num}
            editIndex={editIndex}
            setEditor={setEditor}
            insertParagraph={insertParagraph}
            paragraph={paragraphs[index]}
          />
        ))}
      </div>
      <div className="ChapterTextButtons">
        <button onClick={() => setIsEdit(currentState => !currentState)}>Назад</button>
        <a href={`/`}>Вернуться на страницу</a>
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
    <div className="bg-gray-200 pt-4">
      {!isEdit ? (
        <TextRead text={text} setText={setText} setIsEdit={setIsEdit} />
      ) : (
        <TextEditor text={text} setIsEdit={setIsEdit} />
      )}
    </div>
  );
};

export default AddChapterText;
