import { $authHost, $host } from '../helpers';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getData = async type => {
  const { data } = await $host.get(type + '/all');
  return data;
};

export const postData = async (type, value) => {
  const { data } = await $authHost.post(type, { value: value });
  return data;
};

export const getHTML = async url => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/' + url);
    return data;
  } catch (err) {
    toast.error('Файл не найден');
  }
};
