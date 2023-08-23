import { useState, useEffect } from 'react';
import Discussion from '../Discussion/Discussion';
import { GalleryItem } from '../Gallery';
import Rating from './Rating';
import parse from 'html-react-parser';
import { getBookByTranslatorId } from '../../actions/bookApi';

const TitlesByTranslator = props => {
  const { id, translatorId } = props;
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    getBookByTranslatorId(translatorId).then(res => {
      setTitles(res.filter(x => x.id != id));
    });
  }, []);

  if (!titles.length) return;

  return (
    <div className="px-4">
      <span className="text-xl">Другие работы переводчика: </span>
      <div className="flex flex-row mt-4">
        {titles.map(title => (
          <GalleryItem
            id={title.id + title.img}
            img={title.img}
            name={title.name}
            key={title.id}
            imgStyle={
              'first:ml-0 inline-block aspect-3/4 sm:w-[208px] relative my-auto rounded-md mx-2'
            }
          />
        ))}
      </div>
    </div>
  );
};

export const Info = props => {
  const { book, desc } = props;
  return (
    <div className="max-w-[912px] bg-white mx-auto h-full flex flex-col">
      <div className="flex flex-col p-4">
        <span className="text-xl mb-4">Описание</span>
        <span className="text-md">{parse(desc)}</span>
      </div>
      <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
      <TitlesByTranslator id={book.id} translatorId={book.translator.id} />
      <Discussion className="w-[880px] mx-auto" id={book.discussionId} />
    </div>
  );
};
