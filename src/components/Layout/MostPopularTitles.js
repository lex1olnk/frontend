import { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { GalleryItem } from '../Gallery';
import { titleGetMostPopular } from '../../http/titleApi';

const responsive = {
  360: { items: 2 },
  640: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
  1280: { items: 6 }
};

export const MostPopularTitles = () => {
  const [items, setItems] = useState([]);
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    titleGetMostPopular(10, 1).then(res => {
      const items2 = res.map(title => {
        return (
          <GalleryItem
            id={title.id}
            img={title.img}
            name={title.name}
            imgStyle={'galleryItem'}
            isLine={false}
          />
        );
      });
      setTitles(items2);
    });
  }, []);

  console.log(titles);
  return (
    <div className="mostPopular">
      <div className="bg-white w-full p-2">
        <p>Популярные тайтлы</p>
      </div>
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        paddingLeft={4}
        paddingRight={4}
        responsive={responsive}
        mouseTracking
        items={titles}
      />
    </div>
  );
};