import { $authHost, $host } from './index';

export const registration = async ({ name, password, email, img }) => {
  const formData = new FormData();
  formData.append('nickname', name);
  formData.append('password', password);
  formData.append('email', email);
  formData.append('img', img);
  const response = await $host.post('user/registration', formData);
  return response;
};

export const login = async (email, password) => {
  const response = await $host.post('user/login', { email, password, role: 'ADMIN' });
  return response;
};

export const check = async () => {
  const response = await $host.post('user/check', { email, password, role: 'ADMIN' });
  return response;
};
