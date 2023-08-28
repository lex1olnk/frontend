import { toast } from 'react-toastify'
import { $authHost, $host } from '../helpers'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface Comment {
  id: number
  bookId: number
  description: string
}

export const postComment = createAsyncThunk('comments/postComment', async (commentData) => {
  const response = await $host.post('/api/comments', commentData)
  return response.data
})

export const getDisccusion = createAsyncThunk('discussion/getDiscussion', async (id: number) => {
  const res = await $host.get(`discussion/${id}`)
  return res.data
})

export const postBookComment = createAsyncThunk('books/postComment', async (comment: Comment) => {
  const res = await $authHost
    .post(`book/${comment.bookId}/${comment.id}/comment`, comment.description)
    .catch((error: any) => {
      toast.error(error.response.data.message)
    })
  return res
})
