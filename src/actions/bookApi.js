import { toast } from 'react-toastify';
import { $host, $authHost, getContentType, getContentFileType } from '../helpers';
import axios from 'axios';

export const postBook = async formValues => {
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
    })
    .catch(res => {
      toast.error(res.response.data.message);
    });
};

export const incrementBookViews = async id => {
  const { data } = await $host.put(`book/${id}/increment`).catch(error => {
    toast.error(error.response.data.message);
  });
  return data;
};

export const getBookLastUpdates = async (limit, page) => {
  const { data } = await $host.get('book/lastUpdates', { params: { limit, page } });
  return data;
};

export const getBookMostPopular = async (limit, page) => {
  const { data } = await $host.get('book/mostPopular', { params: { limit, page } });
  return data;
};

export const getBookPopular = async limit => {
  const { data } = await $host.get('book/popular', { limit });
  return data;
};

export const getBook = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const { data } = await $host.get('book/' + id);
  return data;
};

export const getBookByTranslatorId = async id => {
  const { data } = await $host.get('book/translator/' + id);
  return data;
};

export const postBookmarkByBookId = async (id, value) => {
  const res = await $authHost.post(`book/${id}/bookmark/`, { value }).catch(error => {
    toast.error('Произошла ошибка');
  });
  return res;
};
