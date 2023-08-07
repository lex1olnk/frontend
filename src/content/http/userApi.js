import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async ({ nickname, password, email, img, birthday, sex }) => {
  const formData = new FormData();
  formData.append('nickname', nickname);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('birthday', birthday);
  formData.append('sex', sex);
  formData.append('img', img);
  const { data } = await $host.post('user/registration', formData);
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};

export const login = async ({ email, password }) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  const { data } = await $host.post('user/login', formData);
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};
