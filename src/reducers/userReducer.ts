import { loginUser, verifyUser } from '../actions/userActions'
import { UserState, User, Token } from '../interfaces/user'

import { createSlice } from '@reduxjs/toolkit'

const savedUser = JSON.parse(localStorage.getItem('user') + '') as User
const savedToken = JSON.parse(localStorage.getItem('user') + '') as Token

const initialState: UserState = {
  user: savedUser
    ? savedUser
    : {
        id: 0,
        username: '',
        email: '',
      },
  token: savedToken
    ? savedToken
    : {
        id: 0,
        email: '',
        role: '',
        iat: 0,
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
      localStorage.removeItem('token')
      state.isAuthenticated = false
      state.user = {
        id: 0,
        username: '',
        email: '',
      }
      state.token = {
        id: 0,
        email: '',
        role: '',
        iat: 0,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('token', JSON.stringify(action.payload.token))
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
      })
      .addCase(verifyUser.fulfilled, (state) => {
        const user = JSON.parse(localStorage.getItem('user') + '')
        const token = JSON.parse(localStorage.getItem('token') + '')
        state.user = user
        state.token = token
      })
  },
})

export const { register, login, logout, verify } = userSlice.actions

export default userSlice
