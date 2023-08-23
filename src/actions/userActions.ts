import { $host, getAxiosBody, getContentJsonType } from '../helpers'
import jwt_decode from 'jwt-decode'
import { Dispatch } from 'redux'
import { login, register, verify } from '../reducers/userReducer'
import { formErrorOccured } from '../reducers/layoutReducer'
import { toast } from 'react-toastify'

export const registrateUser = (formValues: object) => {
  return async (dispatch: Dispatch) => {
    try {
      const contentType = getContentJsonType()
      const body = getAxiosBody(formValues)

      const res = await $host.post('user/registration', body, {
        ...contentType,
        withCredentials: true,
      })

      dispatch(register())
    } catch (error: any) {
      dispatch(formErrorOccured({ error: error.response.data.error, inputName: 'username' }))
    }
  }
}

export const loginUser = (formValues: Object) => {
  return async (dispatch: Dispatch) => {
    try {
      const contentType = getContentJsonType()
      const body = getAxiosBody(formValues)

      const res = await $host.post('user/login', body, { ...contentType, withCredentials: true })
      localStorage.setItem('token', jwt_decode(res.data.token))
      dispatch(login(res))
    } catch (error: any) {
      dispatch(formErrorOccured({ error: error.response.data.error, inputName: 'email' }))
    }
  }
}

export const verifyUser = () => {
  if (localStorage.getItem('token')) {
    return async (dispatch: Dispatch) => {
      const res = await $host.get(`/user/auth`, { withCredentials: true })

      if (res.data.success) {
        dispatch(verify())
      }
    }
  } else {
    return {
      type: 'CANNOT_LOAD_USER',
    }
  }
}

export const getUser = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await $host.get(`user/${id}`, { withCredentials: true })

      if (res.data.success) {
        dispatch(verify())
      }
    } catch (error) {
      toast.error('Пользователя с таким id не найдено')
    }
  }
}

// export const getUserById = async ({ queryKey }) => {
//   const [_, id] = queryKey
//   const { data } = await $host.get(`user/${id}`)
//   return data
// }
