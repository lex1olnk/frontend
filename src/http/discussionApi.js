import { $authHost, $host } from '.';

export const getDisccusionById = async id => {
  const { data } = await $host.get('discussion/' + id);
  return data;
};

export const postBookComment = async props => {
  const { bookId, id, desc } = props;

  const { data } = await $authHost.post(`${entity}/${entityId}/`, formData).catch(error => {
    toast.error(error.response.data.message);
  });
  return data;
};
