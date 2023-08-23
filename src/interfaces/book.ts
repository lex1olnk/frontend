export interface BookState{
  book: Book;
  currentBook: Book;
}

export interface BookPayload{
  book: Book;
  username: string;
}

export interface Book{
  id: number;
  name: string;
  originalName: string;
  originalLink?: string;
  img: string;
  createdAt?: string;
  updatedAt?: string;
  genres?: Genre[];
  fandoms?: Fandom[];
  tags?: Tag[];
  author: Author;
  language?: Language;
  discussionId?: number;
  views?: number;
  statusTranslate?: number;
  statusOriginal?: number;
  discount?: number;
  costChapter?: number;
  costAudio?: number;
  chapters?: Chapter[] | null;
  chaptersCount?: number;
  rating?: Rating;
}

export interface Genre {
  id: number;
  value: string;
}

export interface Fandom {
  id: number;
  value: string;
}

export interface Tag {
  id: number;
  value: string;
}

export interface Author {
  id: number;
  value: string;
}

export interface Language {
  id: number;
  value: string;
}

export interface Chapter {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Rating {

}
