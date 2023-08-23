import { UserPayload, UserState, User, Token } from '../interfaces/user'

import { createSlice } from '@reduxjs/toolkit'

const savedUser = JSON.parse(localStorage.getItem('user') + '') as User
const savedToken = JSON.parse(localStorage.getItem('user') + '') as Token

const userSlice = createSlice({
  name: 'user',
  initialState: {
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
  },
  reducers: {
    register() {},
    login(state, action) {
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    verify(state){
      const user = JSON.parse(localStorage.getItem("user") + "");
      state.user = user;
    },
    logout() {
      localStorage.setItem('user', '')
      localStorage.setItem('token', '')
    },
  },
})

export const { register, login, logout, verify } = userSlice.actions

export default userSlice
