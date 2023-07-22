import React, { useState, useContext } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';
import { titlePost } from '../../http/titleApi';
import { SelectedInput, CreatableInput, Label, TextInputDiv } from '../Inputs/Inputs';
import { Context } from '../../..';
import { authorPost } from '../../http/authorApi';

const AddTitlePage = observer(() => {
  const { user } = useContext(Context);
  const [name, setName] = useState('');
  const [origName, setOrigName] = useState('');
  const [src, setSrc] = useState('');
  const [year, setYear] = useState(0);
  const [author, setAuthor] = useState(null);
  const [language, setLanguage] = useState('');
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [fandoms, setFandoms] = useState([]);
  const [img, setImg] = useState('');
  const [desc, setDesc] = useState('');

  const _user = toJS(user.user);

  const click = async () => {
    const res = await titlePost({
      name,
      origName,
      origLink: src,
      authorId: author.id,
      translatorId: _user.id,
      languageId: language.id,
      img,
      year,
      genres,
      desc: JSON.stringify(desc),
      tags,
      fandoms
    });
    console.log(res);
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
            <UploadImage value={img} setValue={setImg} />
          </div>
          <div className="ml-8">
            <TextInputDiv
              title={'Название тайтла'}
              name={'Тайтл'}
              input={'Тайтееел'}
              value={name}
              setValue={setName}
            />
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
            <TextInputDiv title={'Год выпуска'} name={'Год'} value={year} setValue={setYear} />
            <CreatableInput
              type="author"
              input="Автор"
              selectedOption={author}
              setSelectedOption={setAuthor}
              post={authorPost}
              onSelect={true}
            />
            <SelectedInput
              type="language"
              input="Язык оригинала"
              helper={'Японский, корейский и т.д'}
              selectedOption={language}
              setSelectedOption={setLanguage}
              isMulti={false}
              onSelect={true}
            />
            <SelectedInput
              type="genre"
              input="Жанры"
              helper="Старайтесь добавлять не столь много жанров"
              selectedOption={genres}
              setSelectedOption={setGenres}
            />
            <SelectedInput
              type="tag"
              input="Теги"
              helper="Старайтесь добавлять не столь много тегов"
              selectedOption={tags}
              setSelectedOption={setTags}
            />
            <SelectedInput
              type="fandom"
              input="Фандомы"
              helper="Старайтесь добавлять не столь много фандомов"
              selectedOption={fandoms}
              setSelectedOption={setFandoms}
            />
          </div>
        </div>
        <NoteViewer setDesc={setDesc} />
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
