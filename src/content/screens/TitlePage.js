import React, { useEffect, useState } from 'react';
import { titleGetById } from '../http/titleApi';
import { useParams } from 'react-router-dom';
import { ReactComponent as Star } from '../icons/ratingStar.svg';

const Group = ({ title, items }) => {
  const data = items;
  if (!data) return null;
  return (
    <div className="flex flex-row">
      {data.map(item => (
        <div
          className="bg-purple-200 px-4 py-2 mx-2 rounded-md first:ml-0"
          key={item.id + item.value}>
          {item.value}
        </div>
      ))}
    </div>
  );
};

const navMenu = [
  { value: 'Подробности' },
  { value: 'Главы' },
  { value: 'Обсуждения' },
  { value: 'Анонсы' },
  { value: 'Отзывы' }
];

const RatingStars = ({ value, rate }) => {
  const stars = [20.0, 20.0, 20.0, 20.0, 20.0];
  for (let i = 4; i >= 0; i--) {
    if (20 * i > rate) {
      stars[i] = 0;
    } else {
      stars[i] = rate - 20 * i;
      break;
    }
  }
  return (
    <div className="flex flex-row bg-[#FCA5A5] rounded-lg w-[360px] h-9 px-2 py-1 justify-between my-1">
      <span className="ml-1 text-white text-center text-lg">{value}</span>
      <div className="flex flex-row">
        {stars.map(star => {
          return (
            <div className="flex relative mx-1 my-auto">
              <Star
                className="fill-yellow-300 z-10"
                viewBox={-((20 - star) * 14) / 20 + ' 0 14 14'}
                width={'20px'}
                height={'20px'}
                transform={'translate(-' + ((20 - star) / 20) * 20 + ' 0)'}
              />
              <Star className="fill-white absolute z-0" width={'20px'} height={'20px'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Rating = () => {
  const rates = [
    {
      value: 5,
      rate: 81
    },
    {
      value: 4,
      rate: 10
    },
    {
      value: 3,
      rate: 1
    },
    {
      value: 2,
      rate: 2
    },
    {
      value: 1,
      rate: 6
    }
  ];
  const rating = {
    translate: 0,
    audio: 0,
    title: 0
  };
  return (
    <div className="flex flex-row justify-between mx-4">
      <div className="flex flex-col mt-2">
        <span className="text-xl">Общее количество оценок: 0</span>
        <div className="flex flex-row my-auto">
          <div className="flex flex-col text-base [&>span]:my-1 [&>span]:text-lg">
            <span>Рейтинг перевода:</span>
            <span>Рейтинг аудиозаписи:</span>
            <span>Рейтинг тайтла:</span>
          </div>
          <div className="flex flex-col text-base ml-12 [&>span]:my-1 [&>span]:text-lg">
            <span>{rating.translate}</span>
            <span>{rating.audio}</span>
            <span>{rating.title}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {rates.map(item => (
          <RatingStars key={item.value} value={item.value} rate={item.rate} />
        ))}
      </div>
    </div>
  );
};

const TitlePage = () => {
  const [title, setTitle] = useState('');
  const [active, setActive] = useState('Подробности');
  const { id } = useParams();
  useEffect(() => {
    titleGetById(id).then(res => {
      setTitle(res);
    });
  }, []);

  console.log(title);

  const navClick = value => {
    setActive(value);
  };

  if (!title) return <div>...LOADING</div>;

  return (
    <div>
      <div className="w-full bg-cred">
        <div className="max-w-5xl mx-auto h-[416px] flex flex-col justify-between">
          <div className="flex flex-row py-4">
            <img
              src={process.env.REACT_APP_API_URL + '/img/' + title.img}
              className="rounded-md aspect-3/4 w-60 object-cover"
            />
            <div className="flex flex-col w-[480px] ml-6 justify-between">
              <span className="px-4 text-4xl text-white">{title.name}</span>
              <div className="flex flex-row px-4">
                <div className="flex flex-col kek text-xl">
                  <span>Иное название</span>
                  <span>Автор</span>
                  <span>Статус</span>
                  <span>Просмотров</span>
                  <span>Язык</span>
                  <span>Подписка</span>
                </div>
                <div className="flex flex-col kek ml-16">
                  <span>{title.origName}</span>
                  <span>{title.name}</span>
                  <span>{title.statusTran}</span>
                  <span>{title.views}</span>
                  <span>{title.name}</span>
                  <span>НР</span>
                </div>
              </div>
              <div className="flex flex-row ml-4">
                <div className="titlePageButton">Начать читать</div>
                <div className="titlePageButton">В закладки</div>
              </div>
            </div>
          </div>
          <div className="flex flex-row titleMenu">
            {navMenu.map(item => (
              <span
                key={item.value}
                className={
                  active === item.value ? 'bg-white titleMenuSpan' : 'titleMenuSpan text-white'
                }
                onClick={() => navClick(item.value)}>
                {item.value}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-5xl h-[0.1rem] bg-slate-200 rounded-md mx-auto"></div>
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        <div className="flex flex-row">
          <div className="text-xl m-4">Глав: 0</div>
          <div className="text-xl mx-8 my-4">Год выпуска: 2019</div>
        </div>
        <Group title={'Теги'} items={[...title.genres, ...title.tags, ...title.fandoms]} />
        <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
        <div className="flex flex-col">
          <span className="text-xl mb-4">Описание</span>
          <span className="text-md">
            Ян Хе-Джи - известная звезда SNS с более чем 100 000 подписчиками в Instagram. Из-за
            своей популярности девушка получила много признаний, но, несмотря на это, она не имеет
            большого опыта с противоположным полом. Однажды Хе-Джи получила приглашение от SNS пойти
            на свидание с другой популярной звездой, за которой она
          </span>
          <div className="aspect-3/4 w-[240px] bg-purple-200 mx-auto my-4">img</div>
        </div>
        <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
        <Rating />
        <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
      </div>
    </div>
  );
};

export default TitlePage;
