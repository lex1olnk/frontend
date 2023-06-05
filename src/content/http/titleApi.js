import { $host } from './index';

export const titlePost = async ({ name, origName, src, img, genres, tags, fandoms }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('origName', origName);
  formData.append('origLink', src);
  formData.append('img', img);
  formData.append('genres', JSON.stringify(genres));
  formData.append('tags', JSON.stringify(tags));
  formData.append('fandoms', JSON.stringify(fandoms));
  const response = await $host.post('api/title', formData);
  return response;
};
