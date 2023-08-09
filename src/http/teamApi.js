import { $host, $authHost, getContentType } from './index';

export const teamPost = async formValues => {
  try {
    const contentType = getContentType();
    const body = formValues;

    const res = await $authHost
      .post(`team/`, formValues, { ...contentType, withCredentials: true })
      .then(res => {
        //window.location.replace('/');
        console.log(res);
      });
  } catch (err) {
    console.log(err);
  }
};

export const teamGetById = async id => {
  const { data } = await $host.get('team/' + id);
  return data;
};

export const teamsGetAll = async props => {
  const { data } = await $host.get(`team/all`);
  return data;
};
