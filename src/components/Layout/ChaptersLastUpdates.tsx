import React, { useState, useEffect } from 'react'
import { getBookLastUpdates } from '../../actions/bookAction'
import { Link } from 'react-router-dom'
import { Book } from '../../interfaces/book'

type ComponentProps = {
  hideText: (value: string, maxlimit: number) => string
  loading: boolean
}

export const ChaptersLastUpdates: React.FC<ComponentProps> = (props) => {
  const { hideText, loading } = props
  const [isActive, setIsActive] = useState(true)
  const [books, setbooks] = useState<any>()
  const asd = 'block aspect-3/4 sm:h-36 rounded-md'
  const pageNum = 1

  // useEffect(() => {
  //   getBookLastUpdates(10, pageNum).then((res) => {
  //     setbooks(res)
  //   })
  // }, [])
  console.log(loading)
  return (
    <>
      {loading && (
        <>
          {' '}
          <div className='bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0'>
            <div className='w-[110px] h-full rounded-lg bg-slate-300'></div>
            <div className='pl-3 grid grid-cols-1 grid-rows-5 w-full'>
              <div className='h-4 w-2/3 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/2 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <a className='flex flex-row justify-between bottom-0 align-bottom self-end'>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              </a>
            </div>
          </div>
          <div className='bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0'>
            <div className='w-[110px] h-full rounded-lg bg-slate-300'></div>
            <div className='pl-3 grid grid-cols-1 grid-rows-5 w-full'>
              <div className='h-4 w-2/3 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/2 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <a className='flex flex-row justify-between bottom-0 align-bottom self-end'>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              </a>
            </div>
          </div>
          <div className='bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0'>
            <div className='w-[110px] h-full rounded-lg bg-slate-300'></div>
            <div className='pl-3 grid grid-cols-1 grid-rows-5 w-full'>
              <div className='h-4 w-2/3 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/2 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              <a className='flex flex-row justify-between bottom-0 align-bottom self-end'>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
                <div className='h-4 w-1/6 bg-slate-300 rounded-lg'></div>
              </a>
            </div>
          </div>
        </>
      )}
      {!loading && (
        <div className='w-full mx-auto flex flex-col'>
          <div className='mx-auto w-full'>
            {books.map((book: any) => {
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
                        <Link to={`book/${book.id}`}>
                          <button className='text-base my-auto lineUnderWord before:duration-700'>
                            {' '}
                            {hideText(book.name, 80)}
                          </button>
                        </Link>
                      </div>
                      <Link to={`book/${book.id}`}>
                        <a className='text-sm text-left my-auto'>
                          {hideText(book.originalName, 96)}
                        </a>
                      </Link>

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
      )}
    </>
  )
}
