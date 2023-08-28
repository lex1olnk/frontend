import { $host, getAxiosBody, getContentJsonType } from '../helpers'
import { login } from '../reducers/userReducer'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk('users/registerUser', async (formValues: object) => {
  const contentType = getContentJsonType()
  const body = getAxiosBody(formValues)

  const res = await $host.post('user/registration', body, {
    ...contentType,
    withCredentials: true,
  })
  return res.data
})

export const loginUser = createAsyncThunk('users/loginUser', async (formValues: Object) => {
  const contentType = getContentJsonType()
  const body = getAxiosBody(formValues)

  const res = await $host.post('user/login', body, { ...contentType, withCredentials: true })
  localStorage.setItem('token', res.data.token)
  return res.data
})

export const verifyUser = createAsyncThunk('users/verify', async () => {
  if (localStorage.getItem('token')) {
    const res = await $host.get('/user/auth', { withCredentials: true })
    login(res.data)
    if (res.data.success) {
      localStorage.setItem('token', res.data.token)
    }
  }
})

// export const getUserById = async ({ queryKey }) => {
//   const [_, id] = queryKey
//   const { data } = await $host.get(`user/${id}`)
//   return data
// }
