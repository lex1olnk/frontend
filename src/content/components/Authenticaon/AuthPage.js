import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../../..';
import { login, registration } from '../../http/userApi';
import { useNavigate } from 'react-router-dom';
import { Input, Label } from '../Inputs/Inputs';
import Select from 'react-select';
import NoteViewer from '../NoteViewer';
import UploadImage from '../UploadImage';

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
  const [_user, setUser] = useState({
    email: '',
    password: ''
  });

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = e => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    await login({ email: _user.email, password: _user.password }).then(res => {
      user.setUser(res.token);
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
            name="email"
            helper={'Напишите уникальное значение'}
            setValue={handleChange}
          />
          <Input
            title={'Пароль'}
            input={'Пароль'}
            type={'password'}
            name="password"
            helper={'Напишите уникальное значение'}
            setValue={handleChange}
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
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    sex: 0
  });

  const names = [
    { name: 'name', type: 'text', label: 'Никнэйм' },
    { name: 'password', type: 'password', label: 'Пароль' },
    { name: 'repassword', type: 'password', label: 'Подтверждения пароля' },
    { name: 'email', type: 'email', label: 'Почта' }
  ];

  const { _user } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = e => {
    setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    await registration({ nickname: user.name, password: user.password, email: user.email }).then(
      res => {
        _user.setUser({ token: res.token });
        _user.setIsAuth(true);
        navigate('/');
        console.log(res);
      }
    );
  };

  return (
    <div className="bg-slate-200 flex-1">
      <div className="w-[564px] m-auto bg-white flex flex-col p-4">
        <label className="block text-xl">
          Новый пользователь?
          <br />
          <span className="text-sm">
            воспользуйтесь приведенной ниже формой для создания учетной записи
          </span>
        </label>
        <div className="flex flex-col mt-6">
          {names.map(item => (
            <div key={item.name} className="w-full">
              <Input title={item.label} type={item.type} name={item.name} setValue={handleChange} />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={click}
          className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
          Создать
        </button>
      </div>
    </div>
  );
});
