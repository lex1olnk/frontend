import { $host } from './index';

export const authorPost = async name => {
  const response = await $host.post('author', { name });
  return response;
};
