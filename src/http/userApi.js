import { toast } from 'react-toastify';
import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async formValues => {
  const { data } = await $host.post('user/registration', formValues);
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};

export const login = async formValues => {
  const { data } = await $host.post('user/login', formValues);
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};

export const getUserById = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const { data } = await $host.get(`user/${id}`);
  return data;
};
