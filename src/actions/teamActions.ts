import { createAsyncThunk } from '@reduxjs/toolkit'
import { $host, $authHost, getContentFileType } from '../helpers'

type sendRequestProps = {
  userId: number
  teamId: number
}

export const postTeam = createAsyncThunk('teams/postTeam', async (formValues: any) => {
  const contentType = getContentFileType()
  formValues.desc = JSON.stringify(formValues.desc)
  const res = await $authHost.post('team/', formValues, {
    ...contentType,
    withCredentials: true,
  })
  return res.data
})

export const getTeam = createAsyncThunk('teams/getTeam', async ({ queryKey }: any) => {
  const [_, id] = queryKey
  const { data } = await $host.get(`team/${id}`)
  return data
})

export const getTeamsAll = createAsyncThunk('/teams/getTeams', async () => {
  const { data } = await $host.get('team/all')
  return data
})

export const sendTeamRequest = createAsyncThunk(
  'teams/sendTeamRequest',
  async (props: sendRequestProps) => {
    const res = await $authHost.post(`team/${props.teamId}/request/${props.userId}`)
    console.log(res.data)
  },
)
