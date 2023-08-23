import { toast } from 'react-toastify';
import { $authHost, $host } from '../helpers';

export const getDisccusion = async id => {
  const { data } = await $host.get(`discussion/${id}`).catch(error => {
    toast.error(error.response.data.message);
  });
  return data;
};

export const postBookComment = async props => {
  const { bookId, id, desc } = props;

  const { data } = await $authHost.post(`${entity}/${entityId}/`, formData).catch(error => {
    toast.error(error.response.data.message);
  });
  return data;
};
