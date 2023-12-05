import React from 'react'
//  import { useMediaQuery } from 'react-responsive';

import '../../styles/styles.css'
import { Gallery } from '../Gallery'
import { ChaptersLastUpdates } from './ChaptersLastUpdates'
import { TopTitles } from './NavBar.js/TopTitles'
import { Announcements } from './Announcements'
import { ServerNews } from './ServerNews'
import { MostPopularTitles } from './MostPopularTitles'

const hideText = (value: string, maxlimit: number) => {
  return value.length > maxlimit ? value.substring(0, maxlimit - 3) + '...' : value
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const data = [
  {
    id: 0,
    views: 0,
  },
  {
    id: 1,
    views: 0,
  },
  {
    id: 2,
    views: 0,
  },
  {
    id: 3,
    views: 0,
  },
  {
    id: 4,
    views: 0,
  },
  {
    id: 5,
    views: 0,
  },
  {
    id: 6,
    views: 0,
  },
  {
    id: 7,
    views: 0,
  },
  {
    id: 8,
    views: 0,
  },
  {
    id: 9,
    views: 0,
  },
]

const Layout: React.FC = () => {
  return (
    <div className=' bg-slate-100 pt-2'>
      <Gallery data={data} loading={true}/>
      <div className='flex flex-row mx-auto max-w-[1245px] justify-between'>
        <div className='w-[866px]'>
          <MostPopularTitles data={data} loading={true} />
          <Announcements hideText={hideText} loading={true} />
          <ChaptersLastUpdates hideText={hideText} loading={true} />
        </div>
        <div className=' w-[362px] h-16'>
          <ServerNews />
          <TopTitles classNames={classNames} />
          <div className='bg-white p-4'>Menu</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
