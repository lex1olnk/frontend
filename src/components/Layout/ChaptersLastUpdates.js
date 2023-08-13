import { useState, useEffect } from 'react';
import { GalleryItem } from '../Gallery';
import { titleGetLastUpdates } from '../../http/titleApi';

export const ChaptersLastUpdates = props => {
  const { hideText } = props;
  const [isActive, setIsActive] = useState(true);
  const [titles, setTitles] = useState([]);
  const asd = 'block aspect-3/4 sm:h-36 rounded-md';
  const pageNum = 1;

  useEffect(() => {
    titleGetLastUpdates(10, pageNum).then(res => {
      setTitles(res);
    });
  }, []);

  if (!titles) return null;

  return (
    <div className="w-full mx-auto flex flex-col">
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
