import React from 'react';
import AliceCarousel from 'react-alice-carousel';
//import { useMediaQuery } from 'react-responsive';

import 'react-alice-carousel/lib/alice-carousel.css';
import '../styles/styles.css';

const data = [
  {
    id: 0,
    name: 'Naruto',
    img: 'https://wallpapers.com/images/hd/all-anime-chainsaw-man-denji-bcum1oc88t5mw92t.jpg',
    views: 0
  },
  {
    id: 1,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 2,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 3,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 4,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 5,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
    views: 0
  },
  {
    id: 6,
    name: 'Naruto',
    img: 'https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/23e65bb0e903382915182731fa1dcdc2.jpg',
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

const handleDragStart = e => e.preventDefault();

const responsive = {
  360: { items: 2 },
  640: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
  1280: { items: 7 }
};

const GalleryItem = (id, img, name, imgStyle, spanStyle, isLine = true) => {
  const linear =
    'linear-gradient(to bottom, transparent, rgba(176,176,176,0) 80%, rgba(223,223,223,0.7) 76%, rgba(255,255,255,0.83) 100%), url(';
  return (
    <a
      href="#"
      key={id}
      onDragStart={handleDragStart}
      role="presentation"
      style={{
        background: isLine ? linear + img + ')' : 'url(' + img + ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className={imgStyle}>
      {name ? <span className={spanStyle}>{name}</span> : null}
    </a>
  );
};

const Gallery = () => {
  const span = 'absolute bottom-2 left-1/2 text-black text-center -translate-x-1/2';
  const items = data.map(title => {
    return GalleryItem(title.id, title.img, title.name, 'galleryItem', span);
  });

  return (
    <div className="rounded-md mb-8 sm:max-w-myw mx-auto">
      <AliceCarousel
        disableButtonsControls={true}
        disableDotsControls={true}
        paddingLeft={'0.25rem'}
        paddingRight={'0.25rem'}
        responsive={responsive}
        mouseTracking
        items={items}
      />
    </div>
  );
};

/*

const AdvertismentComponent = () => (
  <div className="my-3 w-full flex-column border-1 py-3 rounded-md h-64 justify-between bg-white">
    <h2 className="mb-3">Обновление популярной манги</h2>
    <div className="w-full justify-between flex flex-row">
      {data.map(title => (
        <div key={title.id} className="inline-block h-48">
          <a
            href="#"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(176,176,176,0) 80%, rgba(223,223,223,0.7) 76%, rgba(255,255,255,0.83) 100%), url(' +
                title.img +
                ')',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            className="block h-48 w-36 relative rounded-md">
            <span className="absolute bottom-2 left-1/2 text-black text-center -translate-x-1/2">
              {title.name}
            </span>
          </a>
        </div>
      ))}
    </div>
  </div>
);

*/

const TopDay = () => {
  const mass = Array();
  for (let i = 0; i < 6; i++) {
    mass.push({
      id: i,
      img: data[0].img,
      name: i,
      views: i
    });
  }
  return (
    <div className="align-middle justify-between w-myw flex sm:flex-row flex-col rounded-md h-[332px]">
      <div className="flex flex-col relative bg-white w-[602px] p-4">
        <span className="text-3xl h-full font-medium mt-auto">ТОП ДНЯ</span>
        <div className="aspect-3/4 h-60 flex flex-row">
          <img src={data[0].img} className="object-cover aspect-3/4 h-60 w"></img>
          <div className="flex flex-col ml-4">
            <span>Название: </span>
            <span>Альтернативное название: </span>
            <span>Год выпуска: </span>
            <span>Рейтинг: </span>
            <span>Описание: </span>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="grid grid-cols-3 gap-2">
          {mass.map(title =>
            GalleryItem(title.id, title.img, title.name, 'topDayItem', 'topDayItemSpan', false)
          )}
        </div>
      </div>
    </div>
  );
};

/*
const getLastUpdatesByPage = pageNum => {
  const someData = [];
  return someData;
};
*/
const LastUpdatesComponent = () => {
  const asd = 'block aspect-3/4 h-28 sm:h-48 rounded-md';
  //const data = getLastUpdatesByPage(pageNum);
  return (
    <container className="w-full lg:max-w-6xl mx-auto flex h-full flex-col">
      <span className="text-center text-3xl sm:text-6xl font-medium text-teal-600 my-4">
        Последние обновления
      </span>
      <FavouriteLinks />
      <div className="py-3 sm:p-4 mx-auto h-fit w-full bg-white rounded-xl mt-4">
        {data.map((title, i) => (
          <div key={title.id}>
            <div className="w-full h-48 flex flex-row px-6 sm:px-0">
              {GalleryItem(title.id, title.img, null, asd, null, false)}
              <div className="pl-4 sm:pl-8 grid grid-cols-1 grid-rows-4 w-full">
                <div className="flex flex-row justify-between">
                  <span className="text-xl sm:text-3xl my-auto">{title.name}</span>
                  <div className="h-full flex r-0">
                    <span className="text-md sm:text-lg my-auto py-1 sm:py-1 sm:px-4 bg-teal-400 rounded-full border-2 border-slate-500 text-white">
                      АВТОРСКОЕ
                    </span>
                    <span className="ml-2 text-md sm:text-lg my-auto py-1 sm:py-1 sm:px-4 bg-white rounded-full border-2 border-slate-500">
                      EN-RU
                    </span>
                  </div>
                </div>
                <span className="sm:text-xl my-auto">{title.name}</span>
                <span></span>
                <span className="sm:text-xl my-auto">{title.name}</span>
              </div>
            </div>
            {i + 1 !== data.length ? (
              <div className="h-[0.1rem] w-full bg-slate-200 rounded-md my-4"></div>
            ) : null}
          </div>
        ))}
      </div>
    </container>
  );
};

const FavouriteLinks = () => {
  const names = ['Авторское', 'Фанфики', 'Аудиокниги', 'Ранобе'];
  return (
    <div className="flex flex-row">
      {names.map(name => (
        <div className="rounded-lg bg-teal-200 text-slate-800 px-8 py-4 m-4">{name}</div>
      ))}
    </div>
  );
};

const MostPopular = () => {
  const items = [];
  for (let i = 0; i < 7; i++) items.push(data[i]);
  return (
    <div className="flex flex-row h-full justify-between p-4 bg-white mt-4">
      {items.map(item => GalleryItem(item.id, item.img, null, 'popularItem', null))}
    </div>
  );
};

const ShowGenres = () => {
  return <div></div>;
};

const HomePage = () => {
  return (
    <div className=" bg-slate-100">
      <Gallery />
      <div className="flex flex-row w-full sm:max-w-myw mx-auto mt-5 justify-between">
        <container className="flex h-full flex-col">
          <TopDay />
          <MostPopular />
          <LastUpdatesComponent />
        </container>
        <div className="w-full h-16">
          <div className="bg-white ml-4 p-4">Menu</div>
          <ShowGenres />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
