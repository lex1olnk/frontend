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
    <div className="bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]">
      <div className="flex flex-row mx-auto justify-center">
        <div className="shadow-md text-center w-[333px] h-[460px] rounded-md mx-2 bg-white flex flex-col">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Лого</span>
          </div>
          <div className="px-8 mt-8">
            <UploadImage
              className="mx-auto h-[240px] w-[240px]"
              value={team.img}
              setValue={handleChange}
            />
            <p className="my-3">JPG или PNG не больше 5 мб</p>
            <p>
              Нажмите на <b>квадрат</b>, чтобы добавить изображение
            </p>
          </div>
        </div>
        <div className="w-[720px] min-h-[250px] bg-white shadow-md">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Информация о тайтле</span>
          </div>
          <div className="px-8 my-4 mb-12">
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
          <NoteViewer setDesc={handleChange} />
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        className="block text-white w-36 mx-auto my-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Default
      </button>
    </div>
  );
};

export default AddTeam;
