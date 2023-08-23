import { useState, useEffect } from 'react'
import { GalleryItem } from '../Gallery'
import { getBookLastUpdates } from '../../actions/bookApi'
import { useNavigate } from 'react-router-dom'
import { Book } from '../../interfaces/book'
import { Link } from 'react-router-dom'

type ComponentProps = {
  hideText: (value: string, maxlimit: number) => string
}

export const ChaptersLastUpdates: React.FC<ComponentProps> = ({ hideText }) => {
  const [isActive, setIsActive] = useState(true)
  const [books, setbooks] = useState<Book[]>()
  const asd = 'block aspect-3/4 sm:h-36 rounded-md'
  const pageNum = 1

  const navigate = useNavigate()

  useEffect(() => {
    getBookLastUpdates(10, pageNum).then((res) => {
      setbooks(res)
    })
  }, [])

  if (!books) return null;

  console.log(books)

  return (
    <div className='w-full mx-auto flex flex-col'>
      <div className='mx-auto w-full'>
        {books.map((book) => {
          return (
            <div key={book.id}>
              <div className='bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0'>
                <a
                  href={`/book/${book.id}`}
                  key={book.id}
                  style={{
                    background: `url(${process.env.REACT_APP_API_URL}/img/${book.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className='galleryItemLink'>asd</div>
                </a>
                <div className='pl-3 grid grid-cols-1 grid-rows-5 w-full'>
                  <div>
                    <button
                      onClick={() => navigate(`book/${book.id}`)}
                      className='text-base my-auto lineUnderWord before:duration-700'
                    >
                      {hideText(book.name, 80)}
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`book/${book.id}`)}
                    className='text-sm text-left my-auto'
                  >
                    {hideText(book.originalName, 96)}
                  </button>
                  {book.chapters && (
                    <Link to={`/book/${book.id}/${book?.chapters[0].id}`}>
                      <a className='flex flex-row justify-between border-t-2'>
                        <span className='lineUnderWord'>{book.chapters[0].name}</span>
                        <span>{book.chapters && book.chapters[0].updatedAt}</span>
                      </a>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
