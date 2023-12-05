import React, { useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { GalleryItem } from '../Gallery'
import { getBookMostPopular } from '../../actions/bookAction'

const responsive = {
  360: { items: 2 },
  640: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
  1280: { items: 6 },
}

type MostPopularTitlesProps = {
  data: any[]
  loading: boolean
}

export const MostPopularTitles: React.FC<MostPopularTitlesProps> = (props) => {
  const { data, loading } = props
  const [books, setBooks] = useState([])

  const items = data.map((title) => {
    return <GalleryItem loading={loading} key={title.id} id={title.id} />
  })

  // useEffect(() => {
  //   getBookMostPopular(10, 1).then(res => {
  //     const items2 = res.map(title => {
  //       return (
  //         <GalleryItem
  //           id={title.id}
  //           img={title.img}
  //           name={title.name}
  //           imgStyle={'galleryItem'}
  //           isLine={false}
  //         />
  //       );
  //     });
  //     setBooks(items2);
  //   });
  // }, []);

  return (
    <div className='mostPopular'>
      <div className='bg-white w-full p-2'>
        <p>Популярные тайтлы</p>
      </div>
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        paddingLeft={4}
        paddingRight={4}
        responsive={responsive}
        mouseTracking
        items={items}
      />
    </div>
  )
}
