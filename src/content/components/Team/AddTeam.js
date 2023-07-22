import React, { useState, useContext } from 'react';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';
import { Label, Input } from '../Inputs/Inputs';
import { teamPost } from '../../http/teamApi';
import { Context } from '../../..';
import { toJS } from 'mobx';

const AddTeam = () => {
  const [name, setName] = React.useState('');
  const [src, setSrc] = React.useState('');
  const [img, setImg] = React.useState('');
  const [desc, setDesc] = useState('');
  const { user } = useContext(Context);
  const _user = toJS(user.user);

  const adminId = _user.id;

  //const desc = document.querySelector('.ContentEditable__root').innerHTML;
  const onClick = async () => {
    const res = await teamPost({
      name: name,
      src: src,
      img: img,
      desc: JSON.stringify(desc),
      adminId: adminId
    });
  };

  return (
    <div className="bg-slate-100 h-full">
      <div className="max-w-6xl m-auto bg-white flex flex-col">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold my-8 mx-auto text-center">
          Добавление команды
        </label>
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8">
            <Label value={'ЛОГО'} />
            <UploadImage value={img} setValue={setImg} />
          </div>
          <div className="ml-8">
            <Input
              title={'Название команды'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
              value={name}
              setValue={setName}
            />
            <Input
              title={'Сайт команды'}
              input={'ссылка'}
              helper={'Обычно пишут ссылки на вк группу, тг-канал'}
              value={src}
              setValue={setSrc}
            />
          </div>
        </div>
        <NoteViewer setDesc={setDesc} />
        <button
          type="button"
          onClick={onClick}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
    </div>
  );
};

export default AddTeam;
