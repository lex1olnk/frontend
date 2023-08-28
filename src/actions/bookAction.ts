import { toast } from 'react-toastify'
import { $host, $authHost, getContentFileType } from '../helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const postBook = createAsyncThunk('books/postBook', async (formValues: any) => {
  const contentType = getContentFileType()

  if (formValues.genres) formValues.genres = JSON.stringify(formValues.genres)
  formValues.fandoms = JSON.stringify(formValues.fandoms)
  formValues.tags = JSON.stringify(formValues.tags)
  formValues.author = formValues.author?.id
  formValues.language = formValues.language?.id
  formValues.desc = JSON.stringify(formValues.desc)

  const res = await $authHost.post('book', formValues, {
    ...contentType,
    withCredentials: true,
  })
  return res.data
})

export const incrementBookViews = async (id: string) => {
  const res = await $host.put(`book/${id}/increment`).catch((error: any) => {
    toast.error(error.response.data.message)
  })
  return res
}

export const getBookLastUpdates = async (limit: number, page: number) => {
  const { data } = await $host.get('book/lastUpdates', { params: { limit, page } })
  return data
}

export const getBookMostPopular = async (limit: number, page: number) => {
  const { data } = await $host.get('book/mostPopular', { params: { limit, page } })
  return data
}

export const getBookPopular = async (limit: number) => {
  const { data } = await $host.get('book/popular', { params: limit })
  return data
}

export const getBook = createAsyncThunk('books/getBook', async ({ queryKey }: any) => {
  const [_, id] = queryKey
  const { data } = await $host.get(`book/${id}`)
  return data
})

export const getBookByTranslatorId = async (id: number) => {
  const { data } = await $host.get(`book/translator/${id}`)
  return data
}

export const postBookmarkByBookId = async (id: string, value: number) => {
  const res = await $authHost.post(`book/${id}/bookmark/`, { value }).catch((error: any) => {
    toast.error('Произошла ошибка')
  })
  return res
}
