import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../TextInput';
import { authorPost } from '../../http/authorApi';

const AddAuthor = ({ visible, onClick }) => {
  const [name, setName] = React.useState('');
  const nav = useNavigate();

  console.log(visible);
  if (!visible) return null;

  const click = async () => {
    if (name.length < 1) {
      onClick(!visible);
      return null;
    }
    try {
      const res = await authorPost(name).finally(() => {
        onClick(!visible);
        nav(0);
      });
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backgrop-blue-sm flex justify-center items-center">
      <div className="bg-white p-2 rounded">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold my-8 mx-auto text-center">
          Добавление автора
        </label>
        <div className="flex mx-auto">
          <Input
            title={'Ник автора'}
            input={'Автор'}
            helper={'пишите латинскими символами'}
            value={name}
            setValue={setName}
          />
        </div>
        <button
          type="button"
          onClick={click}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
    </div>
  );
};

export default AddAuthor;
