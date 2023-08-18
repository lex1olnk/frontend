import { toast } from 'react-toastify';
import { $host, $authHost, getContentType, getContentFileType } from './index';
import axios from 'axios';

export const postBook = async formValues => {
  try {
    const contentType = getContentFileType();
    formValues.genres = JSON.stringify(formValues.genres);
    formValues.fandoms = JSON.stringify(formValues.fandoms);
    formValues.tags = JSON.stringify(formValues.tags);
    formValues.author = formValues.author?.id;
    formValues.language = formValues.language?.id;
    formValues.desc = JSON.stringify(formValues.desc);

    const res = await $authHost
      .post(`book`, formValues, {
        ...contentType,
        withCredentials: true
      })
      .then(res => {
        console.log(res.data);
      });
  } catch (err) {
    toast.error('smth went back');
  }
};

export const incrementBookViews = async id => {
  try {
    const { data } = await $host.put(`book/${id}/increment`);
    return data;
  } catch (e) {
    alert(e);
  }
};

export const getBookLastUpdates = async (limit, page) => {
  try {
    const { data } = await $host.get('book/lastUpdates', { params: { limit, page } });
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const getBookMostPopular = async (limit, page) => {
  try {
    const { data } = await $host.get('book/mostPopular', { params: { limit, page } });
    return data;
  } catch (e) {
    alert(e.message);
  }
};

export const getBookPopular = async limit => {
  const { data } = await $host.get('book/popular', { limit });
  return data;
};

export const getBookById = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const { data } = await $host.get('book/' + id);
  return data;
};

export const getBookByTranslatorId = async id => {
  const { data } = await $host.get('book/translator/' + id);
  return data;
};

export const postBookmarkByBookId = async (id, value) => {
  try {
    const res = await $authHost.post(`book/${id}/bookmark/`, { value });
    return res;
  } catch (error) {
    toast.error('Произошла ошибка');
  }
};
