export const Announcements = props => {
  const { hideText } = props;
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
