import { useContext, useState } from 'react';
import { login } from '../../http/userApi';
import { Input } from '../Inputs/inputs';
import { observer } from 'mobx-react-lite';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
    await login(formValues)
      .then(res => {
        user.setUser(res.token);
        user.setIsAuth(true);
        navigate('/');
        console.log(user);
        console.log(res);
      })
      .catch(error => {
        toast(error.response.data.message);
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
