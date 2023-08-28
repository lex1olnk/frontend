import { getBook } from '../actions/bookAction'
import { getDisccusion } from '../actions/discussionApi'
import { BookState } from '../interfaces/book'

import { createSlice } from '@reduxjs/toolkit'

const initialState: BookState = {
  book: {
    id: 0,
    name: '',
    originalName: '',
    img: '',
    createdAt: '',
  },
  books: [],
  discussion: undefined,
  chapters: undefined,
  isLoading: true
}

const BookSlice = createSlice({
  name: 'Book',
  initialState: { ...initialState  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBook.fulfilled, (state, action) => {
        state.book = action.payload.data
        state.isLoading = false
      })
      .addCase(getDisccusion.fulfilled, (state, action) => {
        state.discussion = action.payload.data
      })
  }
})

export default BookSlice
