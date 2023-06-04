import React from 'react';
import Select from 'react-select';
import NoteViewer from '../components/NoteViewer';
import { Input, Label } from '../components/TextInput';
import UploadImage from '../components/UploadImage';
import axios from 'axios';

const SingleSelect = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const items = [
    {
      id: 0,
      value: 'Мужчина',
      label: 'Мужчина'
    },
    {
      id: 1,
      value: 'Женщина',
      label: 'Женщина'
    },
    {
      id: 2,
      value: 'Неопределено',
      label: 'Неопределено'
    }
  ];

  return (
    <div>
      <div className="flex flex-wrap -mx-3 mt-6">
        <div className="w-[240px] mx-auto px-3">
          <Label value="ПОЛ" />
          <Select
            closeMenuOnSelect={true}
            name="colors"
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={items}
            className="basic-single"
            classNamePrefix="select"
          />
        </div>
      </div>
    </div>
  );
};

const AuthPage = () => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPassword, setIsPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [img, setImg] = React.useState('');
  //const desc = document.querySelector('.ContentEditable__root').innerHTML;
  console.log(name);

  function register() {
    const user = { nickname: name, password, email, img };
    axios
      .post(`http://localhost:5000/api/user/registration`, user, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        console.log(res.json);
        window.location.replace('/');
      });
  }

  return (
    <div className="bg-slate-100 h-full">
      <div className="max-w-6xl m-auto bg-white flex flex-col mb-8">
        <Label value={'Регистрация'} />
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8 mt-2">
            <Label value={'ЛОГО'} />
            <UploadImage value={img} setValue={setImg} />
            <SingleSelect />
          </div>
          <div className="ml-8">
            <Input
              title={'Никнэйм'}
              input={'Название'}
              helper={'Напишите уникальное значение'}
              value={name}
              setValue={setName}
            />
            <Input
              title={'Пароль'}
              input={'Пароль'}
              helper={'Напишите уникальное значение'}
              value={password}
              setValue={setPassword}
            />
            <Input
              title={'Повторение пароля'}
              input="Повторный пароль"
              helper="Напишите уникальное значение"
              value={isPassword}
              setValue={setIsPassword}
            />
            <Input
              title={'Email'}
              input={'email'}
              helper={'Напишите уникальное значение'}
              value={email}
              setValue={setEmail}
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

export default AuthPage;
