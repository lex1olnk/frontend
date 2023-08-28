import { toast } from 'react-toastify'
import { $host, $authHost, getContentJsonType } from '../helpers'

export const getChapter = async ({ queryKey }: any) => {
  const [_, id] = queryKey
  const { data } = await $host.get(`chapter/${id}`)
  return data
}

export const postChapter = async (formValues: any) => {
  try {
    const contentType = getContentJsonType()
    formValues = {
      ...formValues,
      ['status']: formValues.status.id,
      ['bookTome']: formValues.bookTome.id,
    }
    const res = await $authHost.post('chapter', formValues, { ...contentType })
    return res
  } catch (e: any) {
    console.log(e)
  }
}

export const postChapterComment = async (
  userId: number,
  discussionId: number,
  id: number,
  path: string,
  value: string,
) => {
  const contentType = getContentJsonType()
  const desc = JSON.stringify(value)
  const { data } = await $authHost.post(
    `chapter/${id}/comment`,
    {
      path,
      discussionId,
      userId,
      value: desc,
    },
    { ...contentType },
  )
}

export const updateChapterText = async (bookId: number, id: number, desc: string) => {
  console.log(bookId, id)
  const body = { bookId, desc }

  const res = await $authHost.post(`chapter/${id}/update`, body).catch((error: any) => {
    toast.error(error.response.data.message)
  })
  return res
}
