import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import NoteViewer from '../../components/NoteViewer';
import UploadImage from '../../components/UploadImage';
import { Label } from '../../components/TextInput';
import { titlePost } from '../../http/titleApi';
import SelectedInput from '../../components/SelectedInput';
import AddAuthor from '../../components/modals/AddAuthor';
import { Context } from '../../..';

const TextInputDiv = ({ title = null, input = null, helper = null, value, setValue }) => {
  return (
    <div className="flex flex-wrap -mx-3 mb-3">
      <div className="w-[640px] mx-auto px-3">
        <label className="ml-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          {title}
        </label>
        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-3 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          placeholder={input}
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <p className="text-gray-600 text-xs italic">{helper}</p>
      </div>
    </div>
  );
};

const AddTitlePage = observer(() => {
  const { user } = useContext(Context);

  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = React.useState('');
  const [origName, setOrigName] = React.useState('');
  const [src, setSrc] = React.useState('');
  const [author, setAuthor] = React.useState({});
  const [language, setLanguage] = React.useState('');
  const [genres, setGenres] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [fandoms, setFandoms] = React.useState([]);
  const [img, setImg] = React.useState('');

  console.log(user);

  const click = async () => {
    const res = await titlePost({
      name,
      origName,
      origLink: src,
      authorId: author.id,
      translatorId: user.id,
      languageId: language.id,
      img,
      genres,
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
            <SelectedInput
              type="author"
              input="Автор"
              helper={<a onClick={() => setShowModal(!showModal)}>Добавить автора</a>}
              selectedOption={author}
              setSelectedOption={setAuthor}
              isMulti={false}
              valueType="name"
              onSelect={true}
            />
            <SelectedInput
              type="language"
              input="Язык оригинала"
              helper={'Японский, корейский и т.д'}
              selectedOption={language}
              setSelectedOption={setLanguage}
              isMulti={false}
              valueType="value"
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
        <NoteViewer />
        <button
          type="button"
          onClick={click}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
      <AddAuthor visible={showModal} onClick={setShowModal} />
    </div>
  );
});

export default AddTitlePage;
