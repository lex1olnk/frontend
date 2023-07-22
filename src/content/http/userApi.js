import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async ({ name, password, email, img, desc }) => {
  const formData = new FormData();
  formData.append('nickname', name);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('img', img);
  formData.append('desc', desc);
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
