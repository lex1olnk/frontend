import React, { useState, useEffect } from 'react'
import { getBookTomes } from '../../actions/bookTomeApi'
import { MyTable } from '../Table'
import AddChapter from './Chapter/AddChapter'

type propTypes = {
  bookId: number,
  translatorId: number
}

const Chapters: React.FC<propTypes> = props => {
  const { bookId, translatorId } = props
  const [isVisible, setIsVisible] = useState(false)
  const [bookTomes, setBookTomes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditor, setIsEditor] = useState(false)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    getBookTomes(bookId).then((res) => {
      setIsLoading(true)
      setBookTomes(res)
    })
  }, [updated])

  console.log(isVisible)

  if (!isLoading) return null;
  return (
    <div className='max-w-[1144px] bg-white mx-auto mt-4'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row'>
          <a href='#' className='bookChapterButton' onClick={() => setIsVisible(!isVisible)}>
            Добавить главу
          </a>
          <a href='#' className='bookChapterButton'>
            Скачать
          </a>
          <a href='#' className='bookChapterButton'>
            Выбрать главы
          </a>
        </div>
        <a href='#' className='bookPageButton'>
          Добавить главу
        </a>
      </div>
      <MyTable
        cols={bookTomes.length && bookTomes}
        rowName={'chapters'}
        isEditor={isEditor}
        bookId={bookId}
      />
      {isVisible && (
        <AddChapter
          translatorId={translatorId}
          setUpdated={setUpdated}
          onClick={setIsVisible}
          bookId={bookId}
        />
      )}
    </div>
  )
}

export default Chapters
