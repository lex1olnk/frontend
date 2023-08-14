import { $authHost, $host } from './index';
import jwt_decode from 'jwt-decode';

export const registration = async formValues => {
  try {
    const { data } = await $host.post('user/registration', formValues);
    localStorage.setItem('token', data.token);
    return { token: jwt_decode(data.token) };
  } catch (e) {
    alert(e.message);
  }
};

export const login = async formValues => {
  try {
    const { data } = await $host.post('user/login', formValues);
    localStorage.setItem('token', data.token);
    return { token: jwt_decode(data.token) };
  } catch (err) {
    alert(err.response.data.message);
  }
};

export const check = async () => {
  const { data } = await $authHost.get('user/auth');
  localStorage.setItem('token', data.token);
  return { token: jwt_decode(data.token) };
};
