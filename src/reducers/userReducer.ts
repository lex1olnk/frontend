import { loginUser, verifyUser } from '../actions/userActions'
import { UserState, User, Token } from '../interfaces/user'

import { createSlice } from '@reduxjs/toolkit'

const savedUser = JSON.parse(localStorage.getItem('user') + '') as User

const initialState: UserState = {
  user: savedUser
    ? savedUser
    : {
        id: 0,
        username: '',
        email: '',
      },
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    register() {},
    login() {},
    verify() {},
    logout(state) {
      localStorage.removeItem('user')
      state.isAuthenticated = false
      state.user = {
        id: 0,
        username: '',
        email: '',
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload.context.user
        localStorage.setItem('user', JSON.stringify(user))
        state.user = user
        state.isAuthenticated = true
      })
      .addCase(verifyUser.fulfilled, (state) => {
        const user = JSON.parse(localStorage.getItem('user') + '')
        state.user = user
      })
  },
})

export const { register, login, logout, verify } = userSlice.actions

export default userSlice
