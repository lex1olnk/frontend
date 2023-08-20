import { toast } from 'react-toastify';
import { $host, $authHost, getContentJsonType } from './index';

export const getChapterById = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const { data } = await $host.get(`chapter/${id}`);
  return data;
};

export const postChapter = async formValues => {
  try {
    const contentType = getContentJsonType();
    formValues.status = formValues.status.id;
    formValues.bookTome = formValues.bookTome.id;
    console.log(formValues);
    const { data } = await $authHost.post('chapter', formValues, { ...contentType });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const postChapterComment = async props => {
  const { discussionId, userId, value, id, path } = props;
  const contentType = getContentJsonType();
  const desc = JSON.stringify(value);
  const { data } = await $authHost.post(
    `chapter/${id}/comment`,
    {
      path,
      discussionId,
      userId,
      value: desc
    },
    { ...contentType }
  );
};

export const updateChapterText = async props => {
  const { bookId, id, desc } = props;
  console.log(bookId, id);
  const body = { bookId, desc };

  const { data } = await $authHost.post(`chapter/${id}/update`, body).catch(error => {
    toast.error(error.response.data.message);
  });
  return data;
};
