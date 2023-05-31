import React from 'react';
import AliceCarousel from 'react-alice-carousel';

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
  640: { items: 2 },
  800: { items: 4 },
  1024: { items: 5 }
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
  console.log(items);
  return <AliceCarousel responsive={responsive} mouseTracking items={items} />;
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
  const mass = Array();
  for (let i = 0; i < 6; i++) {
    mass.push({
      id: i,
      img: data[0].img,
      views: i
    });
  }
  return (
    <div className="justify-between h-36 w-full flex flex-row sm:flex-col bg-white rounded-md sm:h-fit">
      <div className="flex inline-block w-2/5 relative sm:w-full sm:my-4">
        <span className="text-center text-7xl font-medium sm:text-6xl m-auto">ТОП ДНЯ</span>
      </div>
      <div className="flex w-3/5 sm:w-full">
        <div className="grid m-auto grid-cols-6 gap-2 sm:grid-cols-3 sm:gap-3">
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
    <div className="w-full h-52 sm:h-fit bg-teal-400 my-4 flex flex-col justify-evenly">
      <span className="sm:text-center mx-auto text-white text-6xl font-medium sm:text-2xl sm:my-4">
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
const HeaderComponent = () => {
  return (
    <header className=" bg-teal-300 h-12">
      <div className="w-5/6 h-full m-auto flex justify-between align-center">
        <a className="mr-3 my-auto">readZone</a>
        <div className="flex h-full">
          <a className="mx-3 my-auto">Каталог</a>
          <a className="mx-3 my-auto">Поиск</a>
          <a className="mx-3 my-auto">Форум</a>
          <a className="mx-3 my-auto">FAQ</a>
        </div>
        <div className="flex h-full">
          <a className="mx-3 my-auto">Add</a>
          <a className="mx-3 my-auto">Feed</a>
          <a className="mx-3 my-auto">Saved</a>
          <a className="ml-3 my-auto">AccountIcon</a>
        </div>
      </div>
    </header>
  );
};
const HomeComponent = () => {
  return (
    <div className="">
      <HeaderComponent />
      <div>
        <container className="w-5/6 mx-auto flex h-full flex-col mt-5">
          <Gallery />
          <TopTitles />
        </container>
        <RegComponent />
        <container className="w-5/6 mx-auto flex h-full flex-col">kekw</container>
      </div>
    </div>
  );
};

export default HomeComponent;
