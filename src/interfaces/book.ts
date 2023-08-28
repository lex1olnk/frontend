export interface BookState {
  book: Book
  books: Book[]
  chapters?: Chapter[] | undefined
  discussion?: Discussion | undefined
  isLoading: boolean
}

export interface BookPayload {
  book: Book
  username: string
}

export interface Book {
  id: number
  costChapter?: number
  costAudio?: number
  chapters?: Chapter[] | null
  chaptersCount?: number
  discount?: number
  discussionId?: number
  img: string
  name: string
  originalName: string
  originalLink?: string
  statusTranslate?: number
  statusOriginal?: number
  views?: number
  author?: Author
  fandoms?: Fandom[]
  genres?: Genre[]
  tags?: Tag[]
  language?: Language
  rating?: Rating
  createdAt?: string
  updatedAt?: string
}

export interface BookForm {}

export interface Genre {
  id: number
  value: string
}

export interface Fandom {
  id: number
  value: string
}

export interface Tag {
  id: number
  value: string
}

export interface Author {
  id: number
  value: string
}

export interface Language {
  id: number
  value: string
}

export interface Chapter {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface Rating {}
