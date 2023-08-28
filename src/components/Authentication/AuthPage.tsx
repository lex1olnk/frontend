import React, { useState, useEffect } from 'react';
import { registerUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import UploadImage from '../UploadImage';
import { useAppDispatch } from '../../hooks/hooks';

const names = [
  { name: 'nickname', type: 'text', label: 'Никнэйм' },
  { name: 'email', type: 'email', label: 'Почта' },
  { name: 'password', type: 'password', label: 'Пароль' },
  { name: 'repassword', type: 'password', label: 'Подтверждения пароля' }
];

export const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formValues, setFormValues] = useState({
    nickname: '',
    email: '',
    password: '',
    repassword: '',
    birthday: '',
    img: '',
    sex: 0
  });

  // const [validInputs, setValidInputs] = useState({
  //   username: false,
  //   email: false,
  //   password: false,
  //   repassword: false,
  // })

  const [image, setImage] = useState('');

  useEffect(() => {
    setFormValues(prevState => ({ ...prevState, ['img']: image }));
  }, [image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setFormValues(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(formValues);
    dispatch(registerUser(formValues))
  };

  return (
    <div className="bg-slate-200 h-[calc(100vh_-_65px)] flex flex-row align-middle justify-center">
      <div className="text-center w-[333px] h-[600px] rounded-md my-auto mx-2 bg-white flex flex-col p-4">
        <span className="text-xl mt-2">Аватар</span>
        <UploadImage
          className="mx-auto mt-12 h-[240px] w-[240px]"
          value={formValues.img}
          onChange={setImage}
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
        <form onSubmit={handleSubmit} className="flex flex-col mt-6">
          <div>
            <div className={'tracking-wide text-gray-700 text-md mb-1'}>Никнэйм</div>
            <input
              className={
                'appearance-none block w-full bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
              }
              onChange={handleChange}
              type='text'
              name='nickname'
              placeholder='Никнэйм'
            />
          </div>
          
          {/* {names.map(item => (
            <div key={item.name} className="w-full">
              <Input title={item.label} type={item.type} name={item.name} onChange={handleChange} />
            </div>
          ))} */}
          {/* <div className="flex flex-row justify-between">
            <div className="w-[240px]">
              <Input type="date" title="Дата рождения" name="birthday" onChange={handleChange} />
            </div>
            <div>
              <Label value="Пол" />
              <select
                className="w-[240px] appearance-none block bg-white text-gray-700 border border-gray-300 rounded-md py-2 px-4 mb-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                name="sex"
                id="sex"
                onChange={e => handleChange(e)}>
                <option value="0">Мужчина</option>
                <option value="1">Женщина</option>
                <option value="2">Неопределено</option>
              </select>
            </div>
          </div> */}
          <button
            type="submit"
            className="text-white w-36 mx-auto bg-cred hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
            Создать
          </button>
        </form>

      </div>
    </div>
  );
};
