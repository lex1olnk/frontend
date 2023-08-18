import { $host, $authHost } from './index';

const getBookTomesByBookId = async id => {
  const { data } = await $host.get(`bookTome/book/${id}`);
  return data;
};

const postBookTome = async (value, bookId) => {
  const { data } = await $authHost.post('bookTome', { value, bookId });
  return data;
};

export { postBookTome, getBookTomesByBookId };
