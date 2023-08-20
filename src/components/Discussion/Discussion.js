import React, { useEffect, useState } from 'react';
import { TextInputDiv } from '../Inputs/inputs';
import NoteViewer from '../NoteViewer';
import { getDisccusionById } from '../../http/discussionApi';

const Discussion = props => {
  const { id, discussionId, className, onSubmit, userId, path } = props;
  const [updated, setUpdated] = useState(false);
  const [disc, setDisc] = useState(undefined);
  const [desc, setDesc] = useState('');

  console.log(discussionId);

  useEffect(() => {
    getDisccusionById(discussionId).then(res => {
      setDisc(res);
    });
  }, []);

  if (!disc) return;

  useEffect(() => {
    getDescString(`${path}/${id}.txt`).then(res => {
      if (res) ConvertLexical({ descString: res, setDesc });
    });
  }, [updated]);

  const onClick = () => {
    onSubmit({ id, discussionId, userId, value: desc, path }).then(() => {
      setUpdated(false);
    });
  };

  return (
    <div className={!className ? 'w-[1016px] mx-auto px-4 mt-4' : className}>
      <span className="text-xl">Комментарии: {disc.comments.length}</span>
      <div className="mt-4">
        <div>
          <NoteViewer setDesc={setDesc} />
          <button
            onClick={onClick}
            className="float-right px-3 py-1 mt-2 bg-white border-2 border-gray-200">
            Отправить
          </button>
        </div>
        <div className="">
          {disc.comments.length ? (
            disc.comments.map(com => <div key={com.id}>{com.id}</div>)
          ) : (
            <div className="py-16 text-lg text-center">Нет ни одного комментария</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discussion;
