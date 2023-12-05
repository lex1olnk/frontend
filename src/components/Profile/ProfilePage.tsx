import React, { useEffect, useState } from 'react'
import { getProfile, getCurrentProfile, getCurrentProfileMarks } from '../../actions/profileActions'
import { useParams } from 'react-router-dom'
import { State } from '../../interfaces'
import VisibilityIcon from '@mui/icons-material/Visibility'
import ArticleIcon from '@mui/icons-material/Article'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
// import TranslateIcon from '@mui/icons-material/Translate';
// import PublicIcon from '@mui/icons-material/Public';
// import AttributionIcon from '@mui/icons-material/Attribution';
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Bookmarks from './Bookmarks'

const ProfilePage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(({ root }) => root.user)
  const { currentProfile, currentBooks } = useAppSelector(({ root }) => root.profile)
  const [value, setValue] = useState('1')
  const [loading, setLoading] = useState(true)
  // useEffect(() => {
  //   if (isSuccess && currentProfile.id === _user.id) setIsEditor(true);
  // }, [isSuccess]);

  useEffect(() => {
    if (id) {
      const profileId = parseInt(id)
      dispatch(getCurrentProfile(profileId))
      dispatch(getCurrentProfileMarks(profileId))
      setLoading(false)
    }
  }, [])

  const handleChange = (e: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setValue(newValue)
  }
  const bookDescs = [
    {
      name: 'В закладках',
      logo: <ArticleIcon sx={{ width: 30, height: 30 }} />,
      value: 'bookmarksCount',
    },
    {
      name: 'Лайков',
      logo: <VisibilityIcon sx={{ width: 30, height: 30 }} />,
      value: 'likes',
    },
    {
      name: 'Комментариев',
      logo: <VisibilityIcon sx={{ width: 30, height: 30 }} />,
      value: 'comments',
    },
    {
      name: 'Дата регистрации',
      logo: <AccessTimeIcon sx={{ width: 30, height: 30 }} />,
      value: 'createdAt',
    },
  ]

  console.log(currentProfile)

  return (
    <>
      {!loading && (
        <div className='bg-slate-100 pt-1 min-h-[calc(100vh_-_65px_-_148px)]'>
          <div className='max-w-[988px] mx-auto'>
            <div>
              <div className='w-full h-[160px] bg-cred text-center py-4 mt-4 rounded-t-lg'>
                <p className='text-2xl text-white'>{currentProfile.username}</p>
              </div>
              <div className='w-full p-4 bg-white rounded-b-lg'>
                <div className='flex flex-row relative -top-24'>
                  <div className='w-[336px] py-2 mt-28 px-6'>
                    <p>Информация о пользователе</p>
                    {bookDescs.map((desc) => (
                      <div className='flex flex-row py-2' key={desc.name + desc.value}>
                        {desc.logo}
                        <div className='ml-2'>
                          <p className='text-sm m-0 leading-none'>{desc.name}</p>
                          <p className='text-lg leading-[0.75rem]'>профиль какой-то</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='w-[240px]'>
                    <img
                      src={process.env.REACT_APP_API_URL + '/img/' + currentProfile.img}
                      className='h-[240px] w-[240px] rounded-full object-cover border-2 border-white'
                    />
                  </div>
                  <div className='flex flex-col w-[336px] py-2'>
                    <div className='flex flex-row mt-11 justify-center h-14'>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/img/${currentProfile.img}`}
                        className='my-auto rounded-full border-2 border-white aspect-square w-12 object-cover'
                      />{' '}
                      <div className='my-auto mx-4'>
                        <p className='text-white text-left'>Команда</p>
                        <div className='text-left text-xl'>Команда а</div>
                      </div>
                    </div>
                    <div className='ml-4 px-6 mt-2'>
                      <p>Ссылки</p>
                      <div className='flex flex-row mt-2'>
                        <p className='text-lg ml-4'>vk.com</p>
                      </div>
                      <div className='flex flex-row mt-2'>
                        <p className='text-lg ml-4'>vk.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <Tab label='Закладки' value='1' />
                    <Tab label='Работы' value='2' />
                    <Tab label='Комментарии' value='3' />
                  </TabList>
                </Box>
                <TabPanel sx={{ padding: 0 }} value='1'>
                  <Bookmarks books={currentBooks} />
                </TabPanel>
                <TabPanel sx={{ padding: 0 }} value='2'>
                  Item two
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

export default ProfilePage
