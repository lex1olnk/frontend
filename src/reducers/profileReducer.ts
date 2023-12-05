import { getCurrentProfile, getProfile } from '../actions/profileActions'
import { ProfileState } from '../interfaces/profile'

import { createSlice } from '@reduxjs/toolkit'

const initialState: ProfileState = {
  profile: {
    id: 0,
    img: '',
    createdAt: '',
    teamId: 0,
    birthday: '',
    username: '',
  },
  notifications: [],
  currentProfile: {
    id: -1,
    img: '',
    createdAt: '',
    teamId: 0,
    birthday: '',
    username: '',
  },
  currentBooks: [],
}

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState: { ...initialState  },
  reducers: {
    fetchProfile(state, action) {
      state.profile = action.payload.profile
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        const profile = action.payload
        state.profile = { 
          id: profile.id,
          img: profile.img,
          createdAt: profile.createdAt,
          teamId: profile.teamId,
          birthday: profile.birthday,
          username: profile.username
        }
      })
      .addCase(getCurrentProfile.fulfilled, (state, action) => {
        const profile = action.payload
        state.currentProfile = { 
          id: profile.id,
          img: profile.img,
          createdAt: profile.createdAt,
          teamId: profile.teamId,
          birthday: profile.birthday,
          username: profile.username
        }
      })
    }
})

export const { fetchProfile } = ProfileSlice.actions

export default ProfileSlice
