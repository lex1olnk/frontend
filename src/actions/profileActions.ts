import { $host } from '../helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProfile = createAsyncThunk('profile/getProfile', async (id: number) => {
  const res = await $host.get(`user/${id}`, { withCredentials: true })
  return res.data
})

export const getCurrentProfile = createAsyncThunk(
  'profile/getCurrentProfile',
  async (id: number) => {
    const res = await $host.get(`user/${id}`, { withCredentials: true })
    return res.data
  },
)

export const getCurrentProfileMarks = createAsyncThunk(
  'profile/getCurrentProfileMarks',
  async (id: number) => {
    const res = await $host.get(`books/usermarks/${id}`, { withCredentials: true })
    return res.data
  },
)
