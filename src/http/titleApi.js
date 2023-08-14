import { $host, $authHost, getContentType, getContentFileType } from './index';

export const titlePost = async formValues => {
  try {
    const contentType = getContentFileType();
    console.log(formValues.genres);
    formValues.genres = JSON.stringify(formValues?.genres);
    formValues.fandoms = JSON.stringify(formValues?.fandoms);
    formValues.tags = JSON.stringify(formValues?.tags);
    formValues.author = formValues.author.id;
    formValues.language = formValues.language.id;
    formValues.desc = JSON.stringify(formValues.desc);

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
  try {
    const { data } = await $host.put(`title/${id}/increment`);
    return data;
  } catch (e) {
    alert('increment', e.message);
  }
};

export const titleGetLastUpdates = async (limit, page) => {
  try {
    const { data } = await $host.get('title/lastUpdates', { params: { limit, page } });
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const titleGetMostPopular = async (limit, page) => {
  try {
    const { data } = await $host.get('title/mostPopular', { params: { limit, page } });
    return data;
  } catch (e) {
    alert(e.message);
  }
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
