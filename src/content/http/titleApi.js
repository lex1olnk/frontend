import { $host, $authHost } from './index';

export const titlePost = async props => {
  const {
    name,
    origName,
    origLink,
    authorId,
    translatorId,
    languageId,
    img,
    genres,
    tags,
    fandoms,
    year,
    desc
  } = props;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('origName', origName);
  formData.append('origLink', origLink);
  formData.append('img', img);
  formData.append('authorId', authorId);
  formData.append('translatorId', translatorId);
  formData.append('languageId', languageId);
  formData.append('desc', desc);
  formData.append('year', year);
  formData.append('genres', JSON.stringify(genres));
  formData.append('tags', JSON.stringify(tags));
  formData.append('fandoms', JSON.stringify(fandoms));
  const { data } = await $authHost.post('title', formData);
  return data;
};

export const titleIncrementViews = async id => {
  const { data } = await $host.put('title/' + id + '/increment');
  return data;
};

export const titleGetLastUpdates = async (limit, page) => {
  const { data } = await $host.get('title/lastUpdates', { params: { limit, page } });
  return data;
};

export const titleGetPopular = async limit => {
  const { data } = await $host.get('title/popular', { limit });
  return data;
};

export const titleGetById = async id => {
  const { data } = await $host.get('title/' + id);
  return data;
};

export const titleGetByTranslatorId = async id => {
  const { data } = await $host.get('title/translator/' + id);
  return data;
};
