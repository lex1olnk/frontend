import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatableInput, Input, SelectedInput } from '../Inputs/Inputs';
import { bookTomePost, bookTomesGetByBookId } from '../../http/bookTomeApi';
import { chapterPost } from '../../http/chapterApi';

const AddChapter = props => {
  const { setUpdated, isVisible, onClick, titleId } = props;
  const [chapter, setChapter] = useState({
    name: '',
    bookTome: [],
    status: {},
    costChapter: 0,
    costAudio: 0
  });

  const nav = useNavigate();

  const handleChange = e => {
    setChapter(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    try {
      const res = await chapterPost({
        name: chapter.name,
        bookTome: chapter.bookTome.id,
        status: chapter.status.id,
        titleId: titleId,
        costChapter: chapter.costChapter,
        costAudio: chapter.costAudio
      }).then(res => {
        setUpdated(currentState => !currentState);
      });
    } catch (e) {
      return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold text-center">
          Добавить главу
        </label>
        <div className="flex flex-col mx-auto">
          <Input
            title={'Название'}
            name="name"
            input={'Автор'}
            helper={'пишите латинскими символами'}
            setValue={handleChange}
          />
          <CreatableInput
            type={titleId}
            title={'Название'}
            input={'Том'}
            name={'bookTome'}
            helper={'пишите латинскими символами'}
            setSelectedOption={handleChange}
            get={bookTomesGetByBookId}
            someV={titleId}
            post={bookTomePost}
          />
          <SelectedInput
            type="chapter/status"
            title="Статус"
            input="Статус"
            name="status"
            helper={'В переводе'}
            setSelectedOption={handleChange}
            isMulti={false}
            valueType="value"
            onSelect={true}
          />
          <Input
            title={'Стоимость подписки'}
            name="costChapter"
            input={'Автор'}
            helper={'пишите латинскими символами'}
            setValue={handleChange}
          />
          <Input
            title={'Стоимость аудио'}
            name="costAudio"
            input={'Автор'}
            helper={'пишите латинскими символами'}
            setValue={handleChange}
          />
        </div>
        <div>
          <button
            type="button"
            onClick={click}
            className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800">
            Добавить
          </button>
          <button
            type="button"
            onClick={() => onClick(false)}
            className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none dark:focus:ring-blue-800">
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddChapter;
