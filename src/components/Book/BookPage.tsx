import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBook, incrementBookViews, postBookmarkByBookId } from '../../actions/bookAction'
import { getHTML } from '../../actions/univAction'
import './style.css'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import VisibilityIcon from '@mui/icons-material/Visibility'
import ArticleIcon from '@mui/icons-material/Article'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import TranslateIcon from '@mui/icons-material/Translate'
import PublicIcon from '@mui/icons-material/Public'
import AttributionIcon from '@mui/icons-material/Attribution'

import { Chapters } from './Chapters'
import { Group } from './Group'
import { Info } from './Info'
import { useQuery } from 'react-query'

const bookDescs = [
  {
    name: 'Главы',
    logo: <ArticleIcon sx={{ width: 30, height: 30 }} />,
    value: 'chaptersCount',
  },
  {
    name: 'Просмотры',
    logo: <VisibilityIcon sx={{ width: 30, height: 30 }} />,
    value: 'views',
  },
  {
    name: 'Год',
    logo: <AccessTimeIcon sx={{ width: 30, height: 30 }} />,
    value: 'year',
  },
]

const BookPage = () => {
  const [desc, setDesc] = useState('')
  const [value, setValue] = useState('1')
  const navigate = useNavigate()

  const { id } = useParams()

  const { isLoading, isSuccess, error, isError, data } = useQuery<any, Error>(['id', id], getBook, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  console.log(data)

  useEffect(() => {
    if (isSuccess && id) {
      incrementBookViews(id)
      getHTML(`books/${data.id}/${data.originalName}.txt`)
    }
  }, [isSuccess])

  const onClickButton = () => {
    if (id) postBookmarkByBookId(id, 0)
  }

  const handleChange = (e: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      {isLoading && <div>...Loading team </div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <div className='bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]'>
          <div className='max-w-[912px] mx-auto py-4'>
            <div className='w-full min-h-[160px] bg-cred text-white text-center'>
              <div className='pt-4'>
                <span className='text-2xl '>{data.name}</span>
                <br />
                <span className='text-base'>{data.origName}</span>
              </div>
              <div className='h-16'></div>
            </div>
            <div className='bg-white h-[330px]'>
              <div className='relative -top-20 flex flex-row justify-between p-4'>
                <div className='w-[336px]'>
                  <div className='flex justify-center mt-9 h-14'>
                    <span className='mr-6 bg-cred py-1 px-3 my-auto border-2 border-white'>
                      Авторское
                    </span>
                    <span className='bg-cred py-1 px-3 my-auto border-2 border-white'>
                      В процессе
                    </span>
                  </div>
                  <div className='mt-2 flex flex-col justify-center align-middle'>
                    <p className='pl-6 text-xl pb-2'>Информация о тайтле</p>
                    <div className='px-6 flex flex-row py-2'>
                      <div className='ml-2'>
                        <p className='text-sm m-0 leading-none'>Автор</p>
                        <p className='text-lg leading-none'>{data.author.value}</p>
                      </div>
                    </div>
                    {bookDescs.map((desc) => (
                      <div className='px-6 flex flex-row py-2' key={desc.name + desc.value}>
                        {desc.logo}
                        <div className='ml-2'>
                          <p className='text-sm m-0 leading-none'>{desc.name}</p>
                          <p className='text-lg leading-[0.75rem]'>{data[desc.value]}</p>
                        </div>
                      </div>
                    ))}
                    <div className='pl-6 py-2'>
                      <PublicIcon />
                      <span className='text-lg ml-2'>{data.language?.value}</span>
                    </div>
                  </div>
                </div>
                <div className='w-[240px]'>
                  <img
                    src={process.env.REACT_APP_API_URL + '/img/' + data.img}
                    className='rounded-md h-[320px] w-[240px] object-cover border-2 border-white'
                  />
                  <div className='bookHeadButtons mt-2'>
                    <button onClick={() => navigate(`/book/${id}/${1}`)}>Начать читать</button>
                    <button onClick={onClickButton}>В закладки</button>
                  </div>
                </div>
                <div className='w-[336px]'>
                  <div className='flex flex-row mt-9 justify-center h-14'>
                    <img
                      src={`${process.env.REACT_APP_API_URL}/img/${data.translator.img}`}
                      className='my-auto rounded-full border-2 border-white aspect-square w-12 object-cover'
                    />{' '}
                    <div className='my-auto mx-4'>
                      <p className='text-white text-left'>Переводчик</p>
                      <div className='text-left text-xl'>{data.translator.nickname}</div>
                    </div>
                  </div>
                  <div className='flex flex-col px-10 mt-2'>
                    <p className='text-xl pb-2'>Ссылки переводчиков:</p>
                    <div className='flex flex-row my-2'>
                      <p className='text-lg ml-4'>vk.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Group type='Теги' items={[...data.genres, ...data.tags, ...data.fandoms]} />
            <TabContext value={value}>
              <div>
                <Box className='mt-4'>
                  <TabList
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                    className='max-w-[1144px] mx-auto'
                    TabIndicatorProps={{
                      sx: { backgroundColor: '#AAA' },
                    }}
                    sx={{
                      '& button': {
                        color: 'white',
                        backgroundColor: '#FF5A5A',
                      },
                      '& button:active': { color: 'black', backgroundColor: 'white' },
                      '& button:hover': { color: 'white', backgroundColor: '#FF7C8C' },
                      '& button.Mui-selected': { color: 'black', backgroundColor: 'white' },
                    }}
                  >
                    <Tab label='Подробности' value='1' />
                    <Tab label='Главы' value='2' />
                    <Tab label='Обсуждения' value='3' />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: 0 }} value='1'>
                  <Info book={data} desc={desc} />
                </TabPanel>
                <TabPanel sx={{ padding: 0 }} value='2'>
                  <Chapters bookId={data.id} translatorId={data.translator.id} />
                </TabPanel>
                <TabPanel sx={{ padding: 0 }} value='3'>
                  Item Three
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </div>
      )}
    </>
  )
}

export default BookPage
