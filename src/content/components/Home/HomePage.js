import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
//import { useMediaQuery } from 'react-responsive';

import '../../styles/styles.css';
import { titleGetLastUpdates } from '../../http/titleApi';
import { Gallery, GalleryItem } from '../Gallery';

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

const TopDay = () => {
  const mass = Array();
  for (let i = 0; i < 4; i++) {
    mass.push({
      id: i,
      img: 'defaultImg.jpg',
      name: i,
      views: i
    });
  }
  return (
    <div className="flex flex-col relative rounded-xl bg-white w-[480px] h-[300px] p-4 justify-between">
      <div className="flex rounded-md text-2xl h-[40px] font-medium bg-red-500 mb-2 p-2 text-white">
        <span className="ml-2 top-0">Топ дня</span>
      </div>
      <div className="aspect-3/4 h-52 flex flex-row">
        <img src={data[0].img} className="object-cover aspect-3/4 h-52 rounded-md"></img>
        <div className="flex flex-col ml-4">
          <span>Название: </span>
          <span>Альтернативное название: </span>
          <span>Год выпуска: </span>
          <span>Рейтинг: </span>
          <span>Описание: </span>
        </div>
      </div>
    </div>
  );
};

const LastUpdatesComponent = () => {
  const [isActive, setIsActive] = useState(true);
  const [titles, setTitles] = useState([]);
  const asd = 'block aspect-3/4 sm:h-36 rounded-md';
  const pageNum = 1;

  const click = () => {
    setIsActive(current => {
      console.log(current);
      return !current;
    });
  };

  useEffect(() => {
    titleGetLastUpdates(10, pageNum).then(res => {
      setTitles(res);
    });
  }, []);
  console.log(titles);

  if (!titles) return null;

  return (
    <div className="w-full mx-auto flex flex-col">
      <FavouriteLinks click={click} isActive={isActive} />
      <div className="mx-auto w-full">
        {titles.map(title => {
          const titleTime = new Date(title.updatedAt);
          return (
            <div key={title.id}>
              <div className="bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0">
                <GalleryItem id={title.id} img={title.img} imgStyle={asd} isLine={false} />
                <div className="pl-3 grid grid-cols-1 grid-rows-5 w-full">
                  <div>
                    <a
                      href={'title/' + title.id}
                      className="text-base my-auto lineUnderWord before:duration-700">
                      {hideText(title.name, 80)}
                    </a>
                  </div>
                  <a href={'title/' + title.id} className="text-sm my-auto">
                    {hideText(title.origName, 96)}
                  </a>
                  <a
                    className="flex flex-row justify-between border-t-2"
                    href={'title/' + title.id + '/' + title.chapters[0].id}>
                    <span className="lineUnderWord">{title.chapters[0].name}</span>
                    <span>{title.chapters[0].updatedAt}</span>
                  </a>
                  <span>{title.chapters[1]?.name}</span>
                  <span className="text-sm my-auto">
                    {titleTime.getDate() +
                      '.' +
                      (titleTime.getMonth() + 1) +
                      '.' +
                      titleTime.getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FavouriteLinks = ({ click, isActive }) => {
  const front = 'px-6 py-2 w-fit rounded-t-lg z-20 text-xl ';
  const back = 'px-6 py-2 bg-red-500 w-fit rounded-t-lg absolute text-xl -top-1 z-0 bg-red-500';
  return (
    <div className="flex flex-row">
      <div className="flex flex-col relative mt-6" onClick={click}>
        {isActive && <div className={back}>Обновление книг</div>}
        <div className={front + (isActive && ' bg-white')}>Обновление книг</div>
      </div>
      <div className="flex flex-col relative mt-6" onClick={click}>
        {!isActive && <div className={back}>Новости</div>}
        <div className={front + (!isActive && ' bg-white')}>Новости</div>
      </div>
    </div>
  );
};

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

const Announcements = () => {
  const data = [
    {
      id: 0,
      title: 'Целитель, изгнанный из группы, по сути, сильнейший!',
      info: 'Целитель Рауст вместе со своей напарницей Нарсеной, вселившей в него надежду на лучшее, смогли одолеть эволюционировавшую гидру.',
      time: '05.06.2023',
      team: 'TeamA',
      img: 'https://wallpapers.com/images/hd/all-anime-chainsaw-man-denji-bcum1oc88t5mw92t.jpg'
    },
    {
      id: 1,
      title: 'Целитель',
      info: 'кекв',
      time: '05.06.2023',
      team: 'TeamA',
      img: 'https://wallpapers.com/images/hd/all-anime-chainsaw-man-denji-bcum1oc88t5mw92t.jpg'
    }
  ];
  const responsiveLocal = {
    360: { items: 1 }
  };

  return (
    <>
      <div className="flex flex-col relative bg-white w-full h-[170px] p-3 rounded-lg">
        <span className="top-0 text-lg mb-2">Анонсы</span>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-row w-[410px] h-[110px] text-sm hover:-translate-y-1 transition-all ease-out duration-200">
            <img src={data[0].img} className="rounded-md w-[72px] h-[110px] object-cover" />
            <div className="h-full flex flex-col ml-2 justify-between">
              <span>{hideText(data[0].title, 48)}</span>
              <span>{hideText(data[0].info, 140)}</span>
              <div className="flex flex-row justify-between">
                <span>{data[0].time}</span>
                <span>{data[0].team}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-[410px] h-[110px] text-sm hover:-translate-y-1 transition-all ease-out duration-200">
            <img src={data[0].img} className="rounded-md w-[72px] h-[110px] object-cover" />
            <div className="h-full flex flex-col ml-2 justify-between">
              <span>{hideText(data[0].title, 48)}</span>
              <span>{hideText(data[0].info, 140)}</span>
              <div className="flex flex-row justify-between">
                <span>{data[0].time}</span>
                <span>{data[0].team}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ShowGenres = () => {
  return <div></div>;
};

const HomePageNews = props => {
  return (
    <div className="w-full h-[260px] bg-white p-3 mb-4">
      <span className="text-lg">Новости</span>
      <div className="w-full text-sm">
        <a href="#" className="lineUnderWord">
          <p>Технические работы на сервере 7 Июля.</p>
          <div className="flex flex-row justify-between">
            <p>05.06.2023</p>
            <p>TeamA</p>
          </div>
        </a>
      </div>
      <div className="w-full text-sm my-2">
        <a href="#" className="lineUnderWord">
          <p>Технические работы на сервере 7 Июля.</p>
          <div className="flex flex-row justify-between">
            <p>05.06.2023</p>
            <p>TeamA</p>
          </div>
        </a>
      </div>
      <div className="w-full text-sm my-2">
        <a href="#" className="lineUnderWord">
          <p>Технические работы на сервере 7 Июля.</p>
          <div className="flex flex-row justify-between">
            <p>05.06.2023</p>
            <p>TeamA</p>
          </div>
        </a>
      </div>
      <div className="w-full text-sm my-2">
        <a href="#" className="lineUnderWord">
          <p>Технические работы на сервере 7 Июля.</p>
          <div className="flex flex-row justify-between">
            <p>05.06.2023</p>
            <p>TeamA</p>
          </div>
        </a>
      </div>
      <div className="text-sm">Все новости.</div>
    </div>
  );
};

const TopTitleNav = props => {
  const [arraya, setArraya] = useState([]);

  const g = [
    {
      id: 0,
      name: 'Авторские'
    },
    {
      id: 1,
      name: 'Переводы'
    },
    {
      id: 2,
      name: 'Месяца'
    },
    {
      id: 3,
      name: 'Недели'
    }
  ];

  const onClick = index => {
    arraya[index] = !arraya[index];
    setArraya([...arraya]);
  };

  return (
    <div className="">
      <div className="bg-white w-1/2 px-3 py-1 text-lg mb-1">Топовые</div>
      {g.map(item => (
        <div>
          <div
            className="w-full px-3 py-1 mb-1 bg-white hover:pl-6 transition-all ease-out duration-200"
            onClick={() => onClick(item.id)}>
            {item.name}
          </div>
          <div
            className={classNames(
              arraya[item.id]
                ? 'h-36 p-3 [&>a]:opacity-1 [&>a]:ease-in [&>a]:duration-500 [&>a]:text-sm [&>a]:mb-[2px] mb-2'
                : 'h-0 hidden px-3 py-0 [&>a]:hidden [&>a]:opacity:0',
              'topTitleNavBar'
            )}>
            <a href="#" className="flex">
              <span className="lineUnderWord">1. С системой Marvel в мире Naruto</span>
            </a>
            <a href="#" className="flex">
              <span className="lineUnderWord">1. С системой Marvel в мире Naruto</span>
            </a>
            <a href="#" className="flex">
              <span className="lineUnderWord">1. С системой Marvel в мире Naruto</span>
            </a>
            <a href="#" className="flex">
              <span className="lineUnderWord">1. С системой Marvel в мире Naruto</span>
            </a>
            <a href="#" className="flex">
              <span className="lineUnderWord">1. С системой Marvel в мире Naruto</span>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

const HomePage = () => {
  return (
    <div className=" bg-slate-100 pt-2">
      <Gallery data={data} />
      <div className="flex flex-row mx-auto max-w-[1245px] justify-between">
        <div className="w-[866px]">
          <MostPopular />
          <MostPopular />
          <Announcements />
          <LastUpdatesComponent />
        </div>
        <div className=" w-[362px] h-16">
          <HomePageNews />
          <TopTitleNav />
          <div className="bg-white p-4">Menu</div>
          <ShowGenres />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
