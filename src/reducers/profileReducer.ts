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
  isLoading: false
}

const ProfileSlice = createSlice({
  name: 'Profile',
  initialState: { ...initialState  },
  reducers: {
    fetchProfile(state, action) {
      state.profile = action.payload.profile
    },
  },
})

export const { fetchProfile } = ProfileSlice.actions

export default ProfileSlice
