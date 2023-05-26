const HomeComponent = () => {
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

  return (
    <div className="">
      <header className=" bg-blue-300 h-12 ">
        <div className="w-3/4 h-full m-auto flex justify-between align-center">
          <a className="mr-3 my-auto">WNAME</a>
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
      <div>
        <container className="w-3/4 mx-auto flex">
          <div className="w-full flex-column border-2 p-3 rounded-sm h-64 justify-between">
            <h2 className="mb-3">Обновление популярной манги</h2>
            <div className="w-full justify-between flex flex-row">
              {data.map(title => (
                <div key={title.id} className="inline-block h-48">
                  <a
                    href="#"
                    style={{
                      background:
                        'linear-gradient(to bottom, transparent 75%, rgba(0,0,0,0.5)), url(' +
                        title.img +
                        ')',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    className="block h-40 w-32 align-text-bottom relative">
                    <span className="absolute bottom-1 text-white left-1">{title.id}</span>
                  </a>
                  <a className="align-text-bottom relative">{title.name}</a>
                </div>
              ))}
            </div>
          </div>
        </container>
      </div>
    </div>
  );
};

export default HomeComponent;
