import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { login, registration } from '../http/userApi';
import { useNavigate } from 'react-router-dom';

import { Input, Label } from '../components/TextInput';
import Select from 'react-select';
import NoteViewer from '../components/NoteViewer';
import UploadImage from '../components/UploadImage';

const SingleSelect = ({ selectedOption, setSelectedOption }) => {
  const items = [
    {
      id: 0,
      value: 'МУЖСКОЙ'
    },
    {
      id: 1,
      value: 'ЖЕНСКИЙ'
    },
    {
      id: 2,
      value: 'НЕОПРЕДЕЛЕНО'
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

export const Login = observer(() => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const click = async () => {
    await login({ email, password }).then(res => {
      user.setUser({ token: res.token, id: res.id });
      user.setIsAuth(true);
      navigate('/');
      console.log(user);
      console.log(res);
    });
  };

  return (
    <div className="bg-slate-100 h-screen flex">
      <div className="max-w-6xl m-auto bg-white flex flex-col py-8 rounded-md">
        <Label value={'Авторизация'} />
        <div className="flex flex-col px-8 mx-auto">
          <Input
            title={'Почта'}
            input={'почта'}
            helper={'Напишите уникальное значение'}
            value={email}
            setValue={setEmail}
          />
          <Input
            title={'Пароль'}
            input={'Пароль'}
            type={'password'}
            helper={'Напишите уникальное значение'}
            value={password}
            setValue={setPassword}
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
});

export const AuthPage = observer(() => {
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isPassword, setIsPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [sex, setSex] = React.useState(0);
  const [img, setImg] = React.useState('');
  const { user } = useContext(Context);
  const navigate = useNavigate();
  //const desc = document.querySelector('.ContentEditable__root').innerHTML;

  const click = async () => {
    await registration({ name, password, email, img }).then(res => {
      user.setUser({ token: res.token, id: res.id });
      user.setIsAuth(true);
      navigate('/');
      console.log(res);
    });
  };

  return (
    <div className="bg-slate-100 h-full">
      <div className="max-w-6xl m-auto bg-white flex flex-col mb-8">
        <label className="block uppercase tracking-wide text-gray-700 text-xl font-bold my-8 mx-auto text-center">
          Регистрация
        </label>
        <div className="flex flex-row mx-auto">
          <div className="flex flex-col mr-8 mt-2">
            <Label value={'ЛОГО'} />
            <UploadImage value={img} setValue={setImg} />
            <SingleSelect selectedOption={sex} setSelectedOption={setSex} />
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
              type={'password'}
              helper={'Напишите уникальное значение'}
              value={password}
              setValue={setPassword}
            />
            <Input
              title={'Повторение пароля'}
              input="Повторный пароль"
              type={'password'}
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
          onClick={click}
          className="text-white w-36 mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Default
        </button>
      </div>
    </div>
  );
});
