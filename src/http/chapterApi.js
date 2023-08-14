import { $authHost, getContentJsonType } from './index';

export const chapterPost = async formValues => {
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

export const updateChapterText = async props => {
  const { title, id, desc } = props;
  const formData = new FormData();
  formData.append('titleId', title);
  formData.append('desc', desc);

  const { data } = await $authHost.post('chapter/' + id + '/update', formData);
  return data;
};

export const titleGetLastUpdates = async (limit, page) => {
  const { data } = await $host.get('chapter/lastUpdates', { params: { limit, page } });
  return data;
};
