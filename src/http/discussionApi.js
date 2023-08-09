import { $host } from '.';

export const getDisccusionById = async id => {
  const { data } = await $host.get('discussion/' + id);
  return data;
};
