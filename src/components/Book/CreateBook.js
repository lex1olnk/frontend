import React, { useState, useContext, useEffect } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';
import { postBook } from '../../http/bookApi';
import { SelectedInput, CreatableInput, Label, Input } from '../Inputs/inputs';
import { Context } from '../..';
import { authorPost } from '../../http/authorApi';
import { toast } from 'react-toastify';

const CreateBook = observer(() => {
  const [formValues, setFormValues] = useState({
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
    desc: '',
    translatorId: -1
  });

  const [image, setImage] = useState('');

  const { user } = useContext(Context);
  const _user = toJS(user.user);

  useEffect(() => {
    setFormValues(prevState => ({ ...prevState, ['img']: image }));
  }, [image]);

  useEffect(() => {
    setFormValues(prevState => ({ ...prevState, ['translatorId']: _user.id }));
  }, []);

  const handleChange = e => {
    setFormValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    const res = await postBook({ ...formValues }).catch(res => {
      toast.error(res.response.data.message);
    });
  };
  console.log(_user);
  console.log(formValues);

  return (
    <div className="bg-slate-50">
      <div className="flex flex-row w-full justify-center">
        <div className="shadow-md text-center w-[333px] h-[600px] rounded-md mx-2 bg-white flex flex-col">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Лого</span>
          </div>
          <div className="px-8 mt-8">
            <UploadImage
              className="mx-auto h-[320px] w-[240px]"
              value={formValues.img}
              onChange={setImage}
            />
            <p className="my-3">JPG или PNG не больше 5 мб</p>
            <p>
              Нажмите на <b>квадрат</b>, чтобы добавить изображение
            </p>
          </div>
        </div>
        <div className="w-[720px] h-[800px] bg-white shadow-md">
          <div className="w-full bg-slate-200 h-[52px] flex">
            <span className="text-xl text-left px-8 my-auto">Информация о тайтле</span>
          </div>
          <div className="px-8 mt-4">
            <Input title="Название тайтла" name="name" onChange={handleChange} />
            <Input title="Оригинальное название" name="origName" onChange={handleChange} />
            <Input title="Ссылка на первоисточник" name="src" onChange={handleChange} />
            <Input title="Год выпуска" name="year" onChange={handleChange} />
            <div className="flex flex-row justify-between align-middle [&>div]:w-[320px]">
              <CreatableInput
                name="author"
                type="author"
                label="Автор"
                setSelectedOption={handleChange}
                post={authorPost}
                onSelect={true}
              />
              <SelectedInput
                label="Язык оригинала"
                name="language"
                type="language"
                setSelectedOption={handleChange}
                isMulti={false}
                onSelect={true}
              />
            </div>
            <SelectedInput
              label="Жанры"
              name="genres"
              type="genre"
              setSelectedOption={handleChange}
            />
            <SelectedInput
              label="Теги"
              name="tags"
              type="tag"
              input="Теги"
              setSelectedOption={handleChange}
            />
            <SelectedInput
              label="Фандомы"
              name="tags"
              type="fandom"
              setSelectedOption={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="block mx-auto w-[996px] mt-4">
        <div className=" bg-slate-200 shadow-md h-[52px] flex">
          <span className="text-xl text-left px-8 my-auto">Описание</span>
        </div>
        <NoteViewer setDesc={handleChange} />
      </div>
      <button
        type="button"
        onClick={click}
        className="block text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Default
      </button>
    </div>
  );
});

export default CreateBook;
