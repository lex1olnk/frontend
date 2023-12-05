import { useState, useEffect } from 'react'
import { GalleryItem } from '../Gallery'
import { getBookByTranslatorId } from '../../actions/bookAction'

const TitlesByTranslator = (props: any) => {
  const { id, translatorId } = props
  const [titles, setTitles] = useState([])

  useEffect(() => {
    getBookByTranslatorId(translatorId).then((res) => {
      setTitles(res.filter((x: any) => x.id != id))
    })
  }, [])

  if (!titles.length) return null

  return (
    <div className='px-4'>
      <span className='text-xl'>Другие работы переводчика: </span>
      <div className='flex flex-row mt-4'>
        {titles.map((title: any) => (
          <GalleryItem
            id={title.id + title.img}
            img={title.img}
            name={title.name}
            key={title.id}
            loading={false}
          />
        ))}
      </div>
    </div>
  )
}

const Info = (props: any) => {
  const { book, desc, isLoading } = props
  return (
    <div className='max-w-[988px] bg-white mx-auto h-full flex flex-col p-4'>
      <div className='flex flex-col'>
        <span className='text-xl mb-4'>Описание</span>
      </div>
      <div className='h-4 w-full bg-slate-300 rounded-lg my-1'></div>
      <div className='h-4 w-full bg-slate-300 rounded-lg my-1'></div>
      <div className='h-4 w-1/6 bg-slate-300 rounded-lg my-1'></div>
      {isLoading ? (
        <div>asd</div>
      ) : (
        <TitlesByTranslator id={book.id} translatorId={book.translator.id} />
      )}
    </div>
  )
}

export default Info
