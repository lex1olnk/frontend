import React, { useState } from 'react'
import { Author, Genre } from '../interfaces/book'
import { SelectedInput } from './Inputs/inputs'

type BookCompProps = {
  name: string
  year: string
  author: Author
  translator: string
  genres: Genre[]
  description: string
}

const BookComp: React.FC = (props: any) => {
  return (
    <div className='flex flex-row p-4 bg-white rounded-md mt-2'>
      <div className='w-[109px] h-[144px] bg-slate-200 rounded-md'>img</div>
      <div className='flex flex-col ml-4'>
        <span className='text-lg'>TitleName</span>
        <div className='flex flex-row'>
          <span>Год: ...</span>
          <span>Автор: ...</span>
          <span>Переводчик ...</span>
        </div>
        <div className='flex flex-row'>
          <span>Романтика</span>
          <span>Приключения</span>
        </div>
        <div>Описание</div>
      </div>
    </div>
  )
}

const SearchPage: React.FC = () => {
  const [status, setStatus] = useState('option1')

  const onOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  return (
    <div className='bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]'>
      <div className='max-w-[1280px] mx-auto py-4'>
        <div>asdf</div>
        <div className='flex flex-row justify-between'>
          <div className='w-[957px] mr-auto'>
            <div className='w-full flex flex-row justify-between p-4 bg-white rounded-md'>
              <input className='w-[596px] border-2 p-2 rounded-md' placeholder='Поиск книг' />
              <span className='my-auto'>Сортировка</span>
              <span className='my-auto'>По названию</span>
              <button className='pr-4'>Искать</button>
            </div>
            <BookComp />
            <BookComp />
            <BookComp />
          </div>
          <div className='bg-white w-[307px] rounded-md p-4 list-none'>
            <span className='text-xl'>Фильтры</span>
            <div className='mt-2'>
              <p className='py-2'>Типы</p>
              <input
                className='duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full'
                placeholder='SearchPanel'
              />
            </div>
            <div>
              <p className='py-2'>Жанры</p>
              <input
                className='duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full'
                placeholder='SearchPanel'
              />
            </div>
            <div>
              <p className='py-2'>Теги</p>
              <input
                className='duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full'
                placeholder='SearchPanel'
              />
            </div>
            <div>
              <p className='py-2'>Фандомы</p>
              <input
                className='duration-300 transition-all outline-slate-300 border-2 px-2 py-1 rounded-md w-full'
                placeholder='SearchPanel'
              />
            </div>
            <div>
              <p>Статус перевода</p>
              <div className='flex flex-wrap'>
                <div className='min-w-[50%]'>
                  <label>
                    <input
                      type='radio'
                      value='option1'
                      checked={status === 'option1'}
                      onChange={onOptionChange}
                    />
                    переводится
                  </label>
                </div>
                <div className='min-w-[50%]'>
                  <label>
                    <input
                      className='my-auto'
                      type='radio'
                      value='option2'
                      checked={status === 'option2'}
                      onChange={onOptionChange}
                    />
                    <span className='ml-2'>заброшен</span>
                  </label>
                </div>
                <div className='min-w-[50%]'>
                  <label>
                    <input
                      type='radio'
                      value='option3'
                      checked={status === 'option3'}
                      onChange={onOptionChange}
                    />
                    заморожен
                  </label>
                </div>
                <div className='min-w-[50%]'>
                  <label>
                    <input
                      type='radio'
                      value='option4'
                      checked={status === 'option4'}
                      onChange={onOptionChange}
                    />
                    заморожен
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
