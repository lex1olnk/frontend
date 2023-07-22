import { $host, $authHost } from './index';

const bookTomesGetByBookId = async id => {
  const { data } = await $host.get('bookTome/book/' + id);
  return data;
};

const bookTomePost = async (value, bookId) => {
  const { data } = await $authHost.post('bookTome', { value, bookId });
  return data;
};

export { bookTomePost, bookTomesGetByBookId };
