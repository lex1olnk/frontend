import React from 'react';
import NoteViewer from '../components/NoteViewer';
import MultipleSelect from '../components/MultipleSelect';

const TextInputDiv = (title = null, input = null, helper = null) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-[640px] mx-auto px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {title}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder={input}
        />
        <p className="text-gray-600 text-xs italic">{helper}</p>
      </div>
    </div>
  );
};

const AddTitlePage = () => {
  const items = [
    {
      title: 'Название',
      name: 'Название тайтла'
    },
    {
      title: 'Английское название',
      name: 'текст'
    },
    {
      title: 'Альтернативное название',
      name: 'текст'
    },
    {
      title: 'Ссылка на первоисточник',
      name: 's'
    }
  ];
  return (
    <div className="bg-slate-100">
      <div className="max-w-6xl m-auto bg-white">
        <label className="w-[640px] block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2 mx-auto px-3">
          Информация о тайтле
        </label>
        <div>
          {items.map(item => (
            <div key={item.title} className="">
              {TextInputDiv(item.title, item.name)}
            </div>
          ))}
          <MultipleSelect
            type="genre"
            input="Жанры"
            helper="Старайтесь добавлять не столь много жанров"
          />
          <MultipleSelect
            type="tag"
            input="Теги"
            helper="Старайтесь добавлять не столь много тегов"
          />
          <MultipleSelect
            type="fandom"
            input="Фандомы"
            helper="Старайтесь добавлять не столь много фандомов"
          />
          <NoteViewer />
        </div>
      </div>
    </div>
  );
};

export default AddTitlePage;
