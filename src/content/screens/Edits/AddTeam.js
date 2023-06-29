import React from 'react';
import { Label, Input } from '../../components/TextInput';
import NoteViewer from '../../components/NoteViewer';
import UploadImage from '../../components/UploadImage';
import axios from 'axios';
import SelectedInput from '../../components/SelectedInput';

const AddTeam = () => {
  const [name, setName] = React.useState('');
  const [src, setSrc] = React.useState('');
  const [users, setUsers] = React.useState('');
  const [img, setImg] = React.useState('');
  const adminId = 0;
  //const desc = document.querySelector('.ContentEditable__root').innerHTML;
  console.log(name);

  function register() {
    //const user = { nickname: name, password, email, img };
    const formData = new FormData();
    formData.append('name', name);
    formData.append('src', src);
    formData.append('img', img);
    formData.append('adminId', adminId);
    axios.post(`http://localhost:5000/api/team/`, formData).then(res => {
      //window.location.replace('/');
      console.log(res);
    });
  }
  const working = 'working';
  console.log(working);
  return (
    <div className="bg-slate-100 h-full">
      <div className="max-w-6xl m-auto bg-white flex flex-col">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold my-8 mx-auto text-center">
          Добавление команды
        </label>
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8">
            <Label value={'ЛОГО'} />
            <UploadImage value={img} setValue={setImg} />
          </div>
          <div className="ml-8">
            <Input
              title={'Название команды'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
              value={name}
              setValue={setName}
            />
            <Input
              title={'Сайт команды'}
              input={'ссылка'}
              helper={'Обычно пишут ссылки на вк группу, тг-канал'}
              value={src}
              setValue={setSrc}
            />
            <SelectedInput
              type={'user'}
              input={'Пользователи'}
              selectedOption={users}
              setSelectedOption={setUsers}
              valueType="nickname"
            />
          </div>
        </div>
        <NoteViewer />
        <button
          type="button"
          onClick={() => register()}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
    </div>
  );
};

export default AddTeam;
