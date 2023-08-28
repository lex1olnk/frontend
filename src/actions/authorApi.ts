import { $authHost } from '../helpers';

export const postAuthor = async (value: string) => {
  const { data } = await $authHost.post('author', { value });
  return data;
};
