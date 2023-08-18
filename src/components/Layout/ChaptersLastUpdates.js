import { useState, useEffect } from 'react';
import { GalleryItem } from '../Gallery';
import { getBookLastUpdates, bookGetLastUpdates } from '../../http/bookApi';
import { useNavigate } from 'react-router-dom';

export const ChaptersLastUpdates = props => {
  const { hideText } = props;
  const [isActive, setIsActive] = useState(true);
  const [books, setbooks] = useState('');
  const asd = 'block aspect-3/4 sm:h-36 rounded-md';
  const pageNum = 1;

  const navigate = useNavigate();

  useEffect(() => {
    getBookLastUpdates(10, pageNum).then(res => {
      setbooks(res);
    });
  }, []);

  if (!books) return;

  console.log(books);

  return (
    <div className="w-full mx-auto flex flex-col">
      <div className="mx-auto w-full">
        {books.map(book => {
          const bookTime = new Date(book.updatedAt);
          return (
            <div key={book.id}>
              <div className="bg-white w-full h-[168px] flex flex-row p-3 my-2 rounded-md first:mt-0">
                <GalleryItem id={book.id} img={book.img} imgStyle={asd} isLine={false} />
                <div className="pl-3 grid grid-cols-1 grid-rows-5 w-full">
                  <div>
                    <button
                      onClick={() => navigate(`book/${book.id}`)}
                      className="text-base my-auto lineUnderWord before:duration-700">
                      {hideText(book.name, 80)}
                    </button>
                  </div>
                  <button
                    onClick={() => navigate(`book/${book.id}`)}
                    className="text-sm text-left my-auto">
                    {hideText(book.origName, 96)}
                  </button>
                  <button
                    className="flex flex-row justify-between border-t-2"
                    onClick={() => navigate(`book/${book.id}/${book.chapters[0]?.id}`)}>
                    <span className="lineUnderWord">{book.chapters[0]?.name}</span>
                    <span>{book.chapters[0]?.updatedAt}</span>
                  </button>
                  <span>{book.chapters[1]?.name}</span>
                  <span className="text-sm my-auto">
                    {bookTime.getDate() +
                      '.' +
                      (bookTime.getMonth() + 1) +
                      '.' +
                      bookTime.getFullYear()}
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
