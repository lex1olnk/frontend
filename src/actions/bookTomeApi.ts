import { $host, $authHost } from '../helpers'

export const getBookTomes = async (id: number) => {
  const { data } = await $host.get(`bookTome/book/${id}`)
  return data
}

export const postBookTome = async (bookId: number, value: string) => {
  const { data } = await $authHost.post('bookTome', { bookId, value })
  return data
}
