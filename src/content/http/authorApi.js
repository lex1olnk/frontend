import { $authHost } from './index';

export const authorPost = async value => {
  const { data } = await $authHost.post('author', { value });
  return data;
};
