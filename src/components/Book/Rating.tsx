import React from 'react'

import Star from '../../icons/ratingStar.svg';

type RatingStarsProps = {
  value: number,
  rate: number
}

const RatingStars: React.FC<RatingStarsProps> = ({ value, rate }) => {
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
            <div className="flex relative mx-1 my-auto" key={star + value * 10 + rate * 100}>
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

export default Rating;
