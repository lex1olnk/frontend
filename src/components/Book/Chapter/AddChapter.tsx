import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatableInput, Input, SelectedInput } from '../../Inputs/inputs'
import { postBookTome, getBookTomes } from '../../../actions/bookTomeApi';
import { postChapter } from '../../../actions/chapterApi';
import { toast } from 'react-toastify';

type AddChapterProps = {
  setUpdated: (value: boolean) => void
  onClick: (value: boolean) => void
  bookId: number
  translatorId: number
}

const AddChapter: React.FC<AddChapterProps> = props => {
  const { setUpdated, onClick, bookId, translatorId } = props;
  const [chapter, setChapter] = useState({
    name: '',
    bookTome: {},
    status: {},
    translatorId: -1,
    bookId: -1,
    costChapter: 0,
    costAudio: 0
  });

  useEffect(() => {
    setChapter(prevState => ({
      ...prevState,
      ['bookId']: bookId,
      ['translatorId']: translatorId
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setChapter((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold text-center">
          Добавить главу
        </label>
        <div className="flex flex-col w-[600px] mx-auto">
          <Input
            title={'Название'}
            name="name"
            input={'Глава №'}
            helper={'пишите латинскими символами'}
            onChange={handleChange}
          />
          <CreatableInput
            type={bookId}
            title={'Название'}
            input={'Том'}
            name={'bookTome'}
            helper={'пишите латинскими символами'}
            setSelectedOption={handleChange}
            get={getBookTomes}
            someV={bookId}
            post={postBookTome}
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
            onChange={handleChange}
          />
          <Input
            title={'Стоимость аудио'}
            name="costAudio"
            input={'Автор'}
            helper={'пишите латинскими символами'}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-row justify-between">
          <button
            type="button"
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
