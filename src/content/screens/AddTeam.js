import React from 'react';
import { Label, Input } from '../components/TextInput';
import NoteViewer from '../components/NoteViewer';
import MultipleSelect from '../components/MultipleSelect';

const AddTeam = () => {
  const working = 'working';
  console.log(working);
  return (
    <div className="bg-slate-100 h-full">
      <div className="max-w-6xl m-auto bg-white flex flex-col">
        <Label value={'Регистрация'} />
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8 mt-2">
            <Label value={'ЛОГО'} />
            <img
              src="https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg"
              className="object-cover aspect-3/4 w-60 rounded-md"
            />
          </div>
          <div className="ml-8">
            <Input
              title={'Название команды'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
            />
            <Input
              title={'Сайт команды'}
              input={'ссылка'}
              helper={'Обычно пишут ссылки на вк группу, тг-канал'}
            />
            <MultipleSelect type={'user'} input={'Пользователи'} />
          </div>
        </div>
        <NoteViewer />
      </div>
    </div>
  );
};

export default AddTeam;
