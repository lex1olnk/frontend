import { $host, $authHost } from '../helpers';

export const getBookTomes = async id => {
  const { data } = await $host.get(`bookTome/book/${id}`);
  return data;
};

export const postBookTome = async (value, bookId) => {
  const { data } = await $authHost.post('bookTome', { value, bookId });
  return data;
};
