import { toast } from "react-toastify";
import { $host } from "../helpers";
import { fetchProfile } from "../reducers/profileReducer";
import { Dispatch } from 'redux'

export const getProfile = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await $host.get(`user/${id}`, { withCredentials: true })
      
      dispatch(fetchProfile(res.data));
    } catch (error) {
      toast.error('Пользователя с таким id не найдено')
    }
  }
}