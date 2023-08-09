import { $host, $authHost, getContentType } from './index';

export const titlePost = async formValues => {
  try {
    const contentType = getContentType();

    const res = await $authHost
      .post(`title/`, formValues, { ...contentType, withCredentials: true })
      .then(res => {
        //window.location.replace('/');
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
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
