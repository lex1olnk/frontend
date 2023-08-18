import { $host, $authHost, getContentFileType } from './index';
import { ToastContainer, toast } from 'react-toastify';

export const postTeam = async formValues => {
  try {
    const contentType = getContentFileType();
    formValues.desc = JSON.stringify(formValues.desc);
    const res = await $authHost.post(`team/`, formValues, {
      ...contentType,
      withCredentials: true
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const getTeamById = async ({ queryKey }) => {
  const [_, id] = queryKey;
  const { data } = await $host.get(`team/${id}`);
  return data;
};

export const getTeamsAll = async props => {
  const { data } = await $host.get(`team/all`);
  return data;
};

export const sendTeamRequest = async props => {
  const { userId, teamId } = props;

  const res = await $authHost.post(`team/${teamId}/request/${userId}`);
  console.log(res.data);
};
