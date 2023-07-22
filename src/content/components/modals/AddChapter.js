import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatableInput, Input, SelectedInput } from '../Inputs/Inputs';
import { bookTomePost, bookTomesGetByBookId } from '../../http/bookTomeApi';
import { chapterPost } from '../../http/chapterApi';

const AddChapter = props => {
  const { isVisible, onClick, titleId } = props;
  console.log(titleId);
  const [name, setName] = useState('');
  const [bookTome, setBookTome] = useState('');
  const [status, setStatus] = useState('');
  const [costChapter, setCostChapter] = useState(0);
  const [costAudio, setCostAudio] = useState(0);

  const nav = useNavigate();

  if (!isVisible) return null;

  const click = async () => {
    try {
      const res = await chapterPost({
        name,
        bookTome: bookTome.id,
        status: status.id,
        costChapter,
        costAudio
      }).then(res => {
        console.log(res);
      });
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold text-center">
          Добавить главу
        </label>
        <div className="flex flex-col mx-auto">
          <Input
            title={'Название'}
            input={'Автор'}
            helper={'пишите латинскими символами'}
            value={name}
            setValue={setName}
          />
          <CreatableInput
            type={titleId}
            title={'Название'}
            input={'Том'}
            helper={'пишите латинскими символами'}
            selectedOption={bookTome}
            setSelectedOption={setBookTome}
            get={bookTomesGetByBookId}
            someV={titleId}
            post={bookTomePost}
          />
          <SelectedInput
            type="chapter/status"
            title="Статус"
            input="Статус"
            helper={'В переводе'}
            selectedOption={status}
            setSelectedOption={setStatus}
            isMulti={false}
            valueType="value"
            onSelect={true}
          />
          <Input
            title={'Стоимость подписки'}
            input={'Автор'}
            helper={'пишите латинскими символами'}
            value={costChapter}
            setValue={setCostChapter}
          />
          <Input
            title={'Стоимость аудио'}
            input={'Автор'}
            helper={'пишите латинскими символами'}
            value={costAudio}
            setValue={setCostAudio}
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
