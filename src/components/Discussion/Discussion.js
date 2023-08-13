import React, { useEffect, useState } from 'react';
import { TextInputDiv } from '../Inputs/inputs';
import NoteViewer from '../NoteViewer';
import { getDisccusionById } from '../../http/discussionApi';

const Discussion = props => {
  const { id, className } = props;
  const [disc, setDisc] = useState(undefined);
  const [desc, setDesc] = useState('');

  useEffect(() => {
    getDisccusionById(id).then(res => {
      setDisc(res);
    });
  }, []);

  if (!disc) return;

  console.log(disc);

  return (
    <div className={!className ? 'w-[1016px] mx-auto px-4 mt-4' : className}>
      <span className="text-xl">Комментарии: {disc.comments.length}</span>
      <div className="mt-4">
        <div>
          <NoteViewer setDesc={setDesc} />
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
