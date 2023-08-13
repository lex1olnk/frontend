import React, { useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { login, registration } from '../../http/userApi';
import { useNavigate } from 'react-router-dom';
import { Input, Label, SelectedInput } from '../Inputs/inputs';
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
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    await login(formValues).then(res => {
      user.setUser(res.token);
      user.setIsAuth(true);
      navigate('/');
      console.log(user);
      console.log(res);
    });
  };

  return (
    <div className="bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)] flex flex-row justify-center">
      <div className="text-center justify-centerw-[333px] h-[400px] rounded-md my-auto mx-2 bg-cred flex flex-col p-4 text-white">
        <img
          src={process.env.REACT_APP_API_URL + '/img/' + 'defaultImg.jpg'}
          className="h-[217px] w-[217px] object-cover mx-auto rounded-full border-2 border-white"
        />
        <span className="my-2">Добро пожаловать к нам!</span>
        <span>Чувствуйте себя как дома.</span>
      </div>
      <div className="bg-white flex flex-col my-auto justify-center h-[400px] rounded-md p-4">
        <span className="text-xl text-center">Авторизация</span>
        <div className="flex flex-col mx-auto w-[364px]">
          <Input
            title={'Почта'}
            input={'почта'}
            name="email"
            helper={'Напишите уникальное значение'}
            onChange={handleChange}
          />
          <Input
            title={'Пароль'}
            input={'Пароль'}
            type={'password'}
            name="password"
            helper={'Напишите уникальное значение'}
            onChange={handleChange}
          />
        </div>
        <a className="text-right">забыли пароль?</a>
        <button
          type="button"
          onClick={click}
          className="text-white w-28 mx-auto my-4 outline-none bg-cred h-9 rounded-full">
          Войти
        </button>
        <a className="text-center">Нету аккаунта? зарегистрируйтесь!</a>
      </div>
    </div>
  );
});

export const AuthPage = observer(() => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    repassword: '',
    birthday: '',
    img: '',
    sex: 0
  });

  const names = [
    { name: 'name', type: 'text', label: 'Никнэйм' },
    { name: 'email', type: 'email', label: 'Почта' },
    { name: 'password', type: 'password', label: 'Пароль' },
    { name: 'repassword', type: 'password', label: 'Подтверждения пароля' }
  ];

  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const click = async () => {
    console.log(formValues);
    await registration(formValues).then(res => {
      user.setFormValues({ token: res.token });
      user.setIsAuth(true);
      navigate('/');
      console.log(res);
    });
  };

  return (
    <div className="bg-slate-200 h-[calc(100vh_-_65px)] flex flex-row align-middle justify-center">
      <div className="text-center w-[333px] h-[600px] rounded-md my-auto mx-2 bg-white flex flex-col p-4">
        <span className="text-xl mt-2">Аватар</span>
        <UploadImage
          className="mx-auto mt-12 h-[240px] w-[240px]"
          value={formValues.img}
          setValue={handleChange}
        />
        <span className="my-4">JPG или PNG не больше 5 мб</span>
        <span>
          Нажмите на <b>квадрат</b>, чтобы добавить изображение
        </span>
      </div>
      <div className="w-[564px] h-[600px] rounded-md my-auto mx-2 bg-white flex flex-col p-4">
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
          <div className="flex flex-row justify-between">
            <div className="w-[240px]">
              <Input type="date" title="Дата рождения" name="birthday" setValue={handleChange} />
            </div>
            <div>
              <Label value="Пол" />
              <select
                className="w-[240px] appearance-none block bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="sex"
                id="sex"
                onChange={handleChange}>
                <option value="0">Мужчина</option>
                <option value="1">Женщина</option>
                <option value="2">Неопределено</option>
              </select>
            </div>
          </div>
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
