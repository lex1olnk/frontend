import React, { useState, useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';
import { titlePost } from '../../http/titleApi';
import { SelectedInput, CreatableInput, Label, Input } from '../Inputs/Inputs';
import { Context } from '../../..';
import { authorPost } from '../../http/authorApi';

const AddTitlePage = observer(() => {
  const [title, setTitle] = useState({
    name: '',
    origName: '',
    origLink: '',
    src: '',
    year: 0,
    author: {},
    language: {},
    genres: [],
    tags: [],
    fandoms: [],
    desc: ''
  });

  const { user } = useContext(Context);
  const _user = toJS(user.user);

  const handleChange = e => {
    setTitle(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    const res = await titlePost({
      name: title.name,
      origName: title.origName,
      origLink: title.origLink,
      authorId: title.author.id,
      translatorId: _user.id,
      languageId: title.language.id,
      img: title.img,
      year: title.year,
      genres: title.genres,
      desc: JSON.stringify(title.desc),
      tags: title.tags,
      fandoms: title.fandoms
    });
  };

  return (
    <div className="bg-slate-100">
      <div className="max-w-6xl m-auto bg-white flex flex-col">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold my-8 mx-auto text-center">
          Информация о тайтле
        </label>
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8 mt-2">
            <Label value={'ЛОГО'} />

            <UploadImage
              value={title.img}
              setValue={handleChange}
              className="w-[240px] h-[320px]"
            />
          </div>
          <div className="ml-8">
            <Input title="Название тайтла" name="name" setValue={handleChange} />
            <Input title="Оригинальное название" name="origName" setValue={handleChange} />
            <Input title="Ссылка на первоисточник" name="src" setValue={handleChange} />
            <Input title="Год выпуска" name="year" setValue={handleChange} />
            <CreatableInput
              name="author"
              type="author"
              setSelectedOption={handleChange}
              post={authorPost}
              onSelect={true}
            />
            <SelectedInput
              name="language"
              type="language"
              setSelectedOption={handleChange}
              isMulti={false}
              onSelect={true}
            />
            <SelectedInput name="genres" type="genre" setSelectedOption={handleChange} />
            <SelectedInput name="tags" type="tag" input="Теги" setSelectedOption={handleChange} />
            <SelectedInput name="tags" type="fandom" setSelectedOption={handleChange} />
          </div>
        </div>
        <NoteViewer setDesc={handleChange} />
        <button
          type="button"
          onClick={click}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
    </div>
  );
});

export default AddTitlePage;
