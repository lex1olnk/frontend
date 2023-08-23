import { $host, getAxiosBody, getContentJsonType } from '../helpers'
import { Dispatch } from 'redux'
import { login, logout, register } from '../reducers/userReducer'
import { formErrorOccured } from '../reducers/layoutReducer'
import { toast } from 'react-toastify'

export const registrateUser = (formValues: object) => {
  return async (dispatch: Dispatch) => {
    try {
      const contentType = getContentJsonType()
      const body = getAxiosBody(formValues)

      await $host.post('user/registration', body, {
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
      localStorage.setItem('token', res.data.token)
      dispatch(login(res.data))
    } catch (error: any) {
      dispatch(formErrorOccured({ error: error.response.data.error, inputName: 'email' }))
    }
  }
}

export const verifyUser = () => {
  return async (dispatch: Dispatch) => {
    if (localStorage.getItem('token')) {
      return async () => {
        const res = await $host.get('/user/auth', { withCredentials: true })
        dispatch(login(res.data))
        if (res.data.success) {
          localStorage.setItem('token', res.data.token)
        }
      }
    } else {
      return {
        type: 'CANNOT_LOAD_USER',
      }
    }
  }
}

export const logOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      dispatch(logout())
    } catch (err) {
      toast.error('Couldnt log out')
    }
  }
}

// export const getUserById = async ({ queryKey }) => {
//   const [_, id] = queryKey
//   const { data } = await $host.get(`user/${id}`)
//   return data
// }
