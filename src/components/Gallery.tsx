import React from 'react'
import AliceCarousel from 'react-alice-carousel'

import 'react-alice-carousel/lib/alice-carousel.css'

import Star from '../icons/ratingStar.svg'

const hideText = (value: string, maxlimit: number) => {
  return value.length > maxlimit ? value.substring(0, maxlimit - 3) + '...' : value
}

type GalleryItemProps = {
  id: number
  img: string
  name: string
  isLine?: boolean
  rating?: string
}

type GalleryProps = {
  data: any[]
}

const GalleryItem: React.FC<GalleryItemProps> = (props) => {
  const { id, img = 'default.jpg', name, isLine = true, rating = '5.00' } = props
  const linear =
    'linear-gradient(to bottom, transparent, rgba(0,0,0,0) 75%, rgba(0,0,0,0.85) 97%, rgba(0,0,0, 1) 100%), url('
  const ratingStyle = 'absolute bottom-6 left-2 text-center font-normal flex flex-row'
  return (
    <a
      href={`/book/${id}`}
      style={{
        background: isLine
          ? `${linear}  ${process.env.REACT_APP_API_URL}/img/${img})`
          : `url(${process.env.REACT_APP_API_URL}/img/${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='galleryItem'
    >
      <div className='galleryItemLink'>
        {rating && (
          <div className={ratingStyle}>
            <Star className='my-auto mr-1' />
            {rating}
          </div>
        )}
        <span className='absolute bottom-1 left-2 text-center font-normal'>
          {hideText(name, 22)}
        </span>
      </div>
    </a>
  )
}

const Gallery: React.FC<GalleryProps> = (galleryProps) => {
  const { data } = galleryProps
  const responsive = {
    360: { items: 2 },
    640: { items: 3 },
    800: { items: 4 },
    1024: { items: 5 },
    1280: { items: 7 },
  }

  const items = data.map((title) => {
    return <GalleryItem key={title.id} id={title.id} img={title.img} name={title.name} />
  })

  return (
    <div className='gallery'>
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        paddingLeft={1}
        paddingRight={1}
        responsive={responsive}
        mouseTracking
        items={items}
      />
    </div>
  )
}

export { Gallery, GalleryItem }
