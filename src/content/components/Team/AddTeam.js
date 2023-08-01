import React, { useState, useContext, useEffect } from 'react';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';
import { Label, Input } from '../Inputs/Inputs';
import { teamPost } from '../../http/teamApi';
import { Context } from '../../..';
import { toJS } from 'mobx';

const AddTeam = () => {
  const [team, setTeam] = useState({
    name: '',
    src: '',
    img: '',
    desc: '',
    adminId: -1
  });

  const { user } = useContext(Context);
  const _user = toJS(user.user);

  useEffect(() => {
    setTeam(prevState => ({ ...prevState, ['adminId']: _user.id }));
  }, []);

  const handleChange = e => {
    setTeam(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onClick = async () => {
    const res = await teamPost({
      name: team.name,
      src: team.src,
      img: team.img,
      desc: JSON.stringify(team.desc),
      adminId: team.adminId
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
            <UploadImage value={team.img} setValue={handleChange} />
          </div>
          <div className="ml-8">
            <Input
              title={'Название команды'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
              name="name"
              setValue={handleChange}
            />
            <Input
              title={'Сайт команды'}
              input={'ссылка'}
              helper={'Обычно пишут ссылки на вк группу, тг-канал'}
              name="src"
              setValue={handleChange}
            />
          </div>
        </div>
        <NoteViewer setDesc={handleChange} />
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
