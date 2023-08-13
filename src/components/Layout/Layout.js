import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
//import { useMediaQuery } from 'react-responsive';

import '../../styles/styles.css';
import { Gallery, GalleryItem } from '../Gallery';
import { ChaptersLastUpdates } from './ChaptersLastUpdates';
import { TopTitles } from './NavBar.js/TopTitles';
import { Announcements } from './Announcements';
import { ServerNews } from './ServerNews';

const hideText = (value, maxlimit) => {
  return value.length > maxlimit ? value.substring(0, maxlimit - 3) + '...' : value;
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    id: 0,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 1,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 2,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 3,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 4,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 5,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 6,
    name: 'Naruto',
    img: 'defaultImg.jpg',
    views: 0
  },
  {
    id: 7,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 8,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 9,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  }
];

const MostPopular = () => {
  const responsive = {
    360: { items: 2 },
    640: { items: 3 },
    800: { items: 4 },
    1024: { items: 5 },
    1280: { items: 6 }
  };
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items2 = data.map(title => {
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
    setItems(items2);
  }, []);

  return (
    <div className="mostPopular mb-4">
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
  );
};

const ShowGenres = () => {
  return <div></div>;
};

const Layout = () => {
  return (
    <div className=" bg-slate-100 pt-2">
      <Gallery data={data} />
      <div className="flex flex-row mx-auto max-w-[1245px] justify-between">
        <div className="w-[866px]">
          <MostPopular />
          <MostPopular />
          <Announcements hideText={hideText} />
          <ChaptersLastUpdates hideText={hideText} />
        </div>
        <div className=" w-[362px] h-16">
          <ServerNews />
          <TopTitles classNames={classNames} />
          <div className="bg-white p-4">Menu</div>
          <ShowGenres />
        </div>
      </div>
    </div>
  );
};

export default Layout;
