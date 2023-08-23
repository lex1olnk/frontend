import { $authHost } from '../helpers';

export const postAuthor = async value => {
  const { data } = await $authHost.post('author', { value });
  return data;
};
