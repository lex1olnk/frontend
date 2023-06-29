import { $host } from './index';

export const getData = async type => {
  const { data } = await $host.get(type + '/all');
  return data;
};
