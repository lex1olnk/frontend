import React from 'react';
import NoteViewer from '../components/NoteViewer';
import MultipleSelect from '../components/MultipleSelect';
import UploadImage from '../components/UploadImage';
import { titlePost } from '../http/titleApi';

const TextInputDiv = ({ title = null, input = null, helper = null, value, setValue }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-[640px] mx-auto px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {title}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder={input}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <p className="text-gray-600 text-xs italic">{helper}</p>
      </div>
    </div>
  );
};

const AddTitlePage = () => {
  const [name, setName] = React.useState('');
  const [origName, setOrigName] = React.useState('');
  const [src, setSrc] = React.useState('');
  const [genres, setGenres] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [fandoms, setFandoms] = React.useState([]);
  const [img, setImg] = React.useState('');

  const click = async () => {
    const res = await titlePost({ name, origName, src, img, genres, tags, fandoms });
    console.log(res);
  };

  return (
    <div className="bg-slate-100">
      <div className="max-w-6xl m-auto bg-white">
        <label className="w-[640px] block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2 mx-auto px-3">
          Информация о тайтле
        </label>
        <div>
          <TextInputDiv title={'Название тайтла'} name={'Тайтл'} value={name} setValue={setName} />
          <TextInputDiv
            title={'Оригинальное название'}
            name={'кек'}
            value={origName}
            setValue={setOrigName}
          />
          <TextInputDiv
            title={'Ссылка на первоисточник'}
            name={'ССылка'}
            value={src}
            setValue={setSrc}
          />
          <MultipleSelect
            type="genre"
            input="Жанры"
            helper="Старайтесь добавлять не столь много жанров"
            selectedOption={genres}
            setSelectedOption={setGenres}
          />
          <MultipleSelect
            type="tag"
            input="Теги"
            helper="Старайтесь добавлять не столь много тегов"
            selectedOption={tags}
            setSelectedOption={setTags}
          />
          <MultipleSelect
            type="fandom"
            input="Фандомы"
            helper="Старайтесь добавлять не столь много фандомов"
            selectedOption={fandoms}
            setSelectedOption={setFandoms}
          />
          <UploadImage value={img} setValue={setImg} className="mx-auto" />
          <NoteViewer />
          <button
            type="button"
            onClick={click}
            className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Default
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTitlePage;
