import { $host, $authHost } from './index';

export const teamPost = async props => {
  const { name, src, img, adminId, desc } = props;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('src', src);
  formData.append('img', img);
  formData.append('adminId', adminId);
  formData.append('desc', desc);
  const res = await $authHost.post(`team/`, formData).then(res => {
    //window.location.replace('/');
    console.log(res);
  });
};

export const teamGetById = async id => {
  const { data } = await $host.get('team/' + id);
  return data;
};

export const teamsGetAll = async props => {
  const { data } = await $host.get(`team/all`);
  return data;
};
