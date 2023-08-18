import { useState } from 'react';

export const TopTitles = props => {
  const { classNames } = props;
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
        <div key={item.name + item.id}>
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
