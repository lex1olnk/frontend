import { $authHost, $host } from './index';
import axios from 'axios';

export const getData = async type => {
  const { data } = await $host.get(type + '/all');
  return data;
};

export const postData = async (type, value) => {
  const { data } = await $authHost.post(type, { value: value });
  return data;
};

export const getDescString = async url => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_API_URL + '/' + url);
    return data;
  } catch (e) {
    alert('str', e.message);
  }
};
