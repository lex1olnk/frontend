import { $authHost } from './index';

export const chapterPost = async props => {
  const { name, bookTome, status, costChapter, costAudio, titleId } = props;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('booktomeId', bookTome);
  formData.append('titleId', titleId);
  formData.append('status', status);
  formData.append('costChapter', costChapter);
  formData.append('costAudio', costAudio);

  const { data } = await $authHost.post('chapter', formData);
  return data;
};

export const updateChapterText = async props => {
  const { title, id, desc } = props;
  const formData = new FormData();
  formData.append('titleId', title);
  formData.append('desc', desc);

  const { data } = await $authHost.post('chapter/' + id + '/update', formData);
  return data;
};
