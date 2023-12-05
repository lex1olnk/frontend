import { $host, getAxiosBody, getContentJsonType } from '../helpers'
import { login } from '../reducers/userReducer'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const registerUser = createAsyncThunk('users/registerUser', async (formValues: any) => {
  const contentType = getContentJsonType()
  const body = getAxiosBody(formValues)

  const res = await $host.post('user/registration', body, {
    ...contentType,
    withCredentials: true,
  })
  return res.data
})

export const loginUser = createAsyncThunk('loginUser', async (formValues: any) => {
  const contentType = getContentJsonType()
  
  const { data } = await $host.post('login', formValues)
  console.log(data)
  return data;
})

export const verifyUser = createAsyncThunk('users/verify', async () => {
  if (!localStorage.getItem('user')) {
    const { data } = await $host.get('/context')
    login(data)
  }
})

// export const getUserById = async ({ queryKey }) => {
//   const [_, id] = queryKey
//   const { data } = await $host.get(`user/${id}`)
//   return data
// }
