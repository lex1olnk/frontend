import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import HeaderComponent from '../components/HeaderComponent';
import { useMediaQuery } from 'react-responsive';

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
  }
];

const handleDragStart = e => e.preventDefault();

const responsive = {
  360: { items: 2 },
  640: { items: 3 },
  800: { items: 4 },
  1024: { items: 5 },
  1280: { items: 6 }
};

const GalleryItem = (id, img, name) => {
  return (
    <a
      href="#"
      key={id}
      onDragStart={handleDragStart}
      role="presentation"
      style={{
        background:
          'linear-gradient(to bottom, transparent, rgba(176,176,176,0) 80%, rgba(223,223,223,0.7) 76%, rgba(255,255,255,0.83) 100%), url(' +
          img +
          ')',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className="galleryItem">
      <span className="absolute bottom-2 left-1/2 text-black text-center -translate-x-1/2">
        {name}
      </span>
    </a>
  );
};

const Gallery = () => {
  const items = data.map(title => {
    return GalleryItem(title.id, title.img, title.name);
  });

  return (
    <div className="rounded-md mb-8">
      <AliceCarousel responsive={responsive} mouseTracking items={items} />
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

const TopTitles = () => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const k = isMobile ? 6 : 12;
  const mass = Array();
  for (let i = 0; i < k; i++) {
    mass.push({
      id: i,
      img: data[0].img,
      views: i
    });
  }
  return (
    <div className="justify-between align-middle sm:h-68 w-full flex sm:flex-row flex-col bg-white rounded-md h-fit py-3">
      <div className="mx-auto flex inline-block sm:w-1/2 relative w-fit my-4">
        <span className="text-center sm:text-7xl font-medium text-6xl m-auto">ТОП ДНЯ</span>
      </div>
      <div className="mx-auto flex sm:w-1/2 w-fit sm:mx-0">
        <div className="grid m-auto sm:pr-3 grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {mass.map(title => (
            <a
              href="#"
              key={title.id}
              style={{
                background: 'url(' + title.img + ')',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              className="topTitleItem">
              <span className="absolute bottom-1 left-1/2 text-black text-center">{title.id}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const RegComponent = () => {
  return (
    <div className="w-full sm:h-52 h-fit bg-teal-400 my-4 flex flex-col justify-evenly">
      <span className="text-center mx-auto text-white sm:text-6xl font-medium text-2xl my-4 sm:my-0">
        Станьте автором уже сегодня
      </span>
      <div className="mx-auto flex justify-between w-2/3 sm:mt-2 sm:mb-4 sm:w-fit">
        <a className="text-center py-3 w-72 bg-white text-2xl font-medium text-teal-400 rounded-full sm:w-32 sm:text-lg">
          РЕГИСТРАЦИЯ
        </a>
        <a className="text-center py-3 w-72 bg-teal-500 text-2xl font-medium text-white rounded-full sm:w-32 sm:text-lg">
          ВХОД
        </a>
      </div>
    </div>
  );
};
/*
const getLastUpdatesByPage = pageNum => {
  const someData = [];
  return someData;
};

const LastUpdatesComponent = () => {
  //const data = getLastUpdatesByPage(pageNum);
  const pageNum = useState(0);
  return (
    <div>
      <span>Последние обновление глав</span>
      <div></div>
    </div>
  );
};*/

const HomePage = () => {
  return (
    <div className=" bg-slate-100">
      <HeaderComponent />
      <div>
        <container className="w-full sm:max-w-7xl mx-auto flex h-full flex-col mt-5">
          <Gallery />
          <TopTitles />
        </container>
        <RegComponent />
        <container className="w-full lg:max-w-7xl mx-auto flex h-full flex-col">
          <span className="text-center text-3xl sm:text-6xl font-medium text-teal-600 my-4">
            Последние обновления
          </span>
          <div className="py-6 sm:p-12 mx-auto h-fit w-full bg-white rounded-xl mt-4">
            {data.map((title, i) => (
              <div key={title.id}>
                <div className="w-full h-48 flex flex-row px-6 sm:px-0">
                  <a
                    href="#"
                    style={{
                      background: 'url(' + title.img + ')',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    className="block h-28 w-28 sm:h-48 sm:w-48 rounded-md"
                  />
                  <div className="px-4 sm:px-16 grid grid-cols-1 grid-rows-4 w-full">
                    <div className="flex flex-row justify-between">
                      <span className="text-xl sm:text-4xl my-auto">{title.name}</span>
                      <div className="h-full flex r-0">
                        <span className="text-lg sm:text-xl my-auto py-1 sm:py-2 px-1 sm:px-4 bg-teal-400 rounded-full border-2 border-slate-500 text-white">
                          АВТОРСКОЕ
                        </span>
                        <span className="ml-6 text-lg sm:text-xl my-auto py-1 sm:py-2 px-1 sm:px-4 bg-white rounded-full border-2 border-slate-500">
                          EN-RU
                        </span>
                      </div>
                    </div>
                    <span className="sm:text-2xl my-auto">{title.name}</span>
                    <span></span>
                    <span className="sm:text-2xl my-auto">{title.name}</span>
                  </div>
                </div>
                {i + 1 !== data.length ? (
                  <div className="h-[0.1rem] w-full bg-slate-200 rounded-md my-8"></div>
                ) : null}
              </div>
            ))}
          </div>
        </container>
      </div>
    </div>
  );
};

export default HomePage;
