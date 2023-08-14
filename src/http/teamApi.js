import { $host, $authHost, getContentFileType } from './index';

export const postTeam = async formValues => {
  try {
    const contentType = getContentFileType();
    formValues.desc = JSON.stringify(formValues.desc);
    const res = await $authHost
      .post(`team/`, formValues, { ...contentType, withCredentials: true })
      .then(res => {
        window.location.replace(`${res.id}`);
      });
  } catch (err) {
    console.log(err);
  }
};

export const getTeamById = async id => {
  const { data } = await $host.get('team/' + id);
  return data;
};

export const getTeamsAll = async props => {
  const { data } = await $host.get(`team/all`);
  return data;
};

export const sendTeamRequest = async props => {
  try {
    const { userId, teamId } = props;

    const res = await $authHost.post(`team/${teamId}/request/${userId}`);
    console.log(res.data);
  } catch (err) {
    if (err.response.status === 404) {
      alert(err.response.data.message);
    } else {
      console.log(err);
    }
  }
};
