import { getTeamsAll } from '../actions/teamActions'
import { TeamsState } from '../interfaces/teams'

import { createSlice } from '@reduxjs/toolkit'

const initialState: TeamsState = {
  teams: [],
  searchTeams: [],
  isLoading: true,
}

const TeamsSlice = createSlice({
  name: 'teams',
  initialState: { ...initialState  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeamsAll.fulfilled, (state, action) => {
        state.teams = action.payload.data
        state.isLoading = false;
      })
      .addCase(getTeamsAll.rejected, (state) => {
        state.isLoading = false;
      })
  }
})

export default TeamsSlice
