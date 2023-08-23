import { useState, useEffect, useContext } from 'react';
import { getBookTomes } from '../../actions/bookTomeApi';

import { MyTable } from '../Table';
import AddChapter from './Chapter/AddChapter';
import { Context } from '../..';
import { toJS } from 'mobx';

const Chapters = ({ bookId, translatorId }) => {
  const { user } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [bookTomes, setBookTomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditor, setIsEditor] = useState(false);
  const [updated, setUpdated] = useState(false);
  const _user = toJS(user.user);

  useEffect(() => {
    if (_user.id === translatorId) {
      setIsEditor(true);
    }
    getBookTomes(bookId).then(res => {
      setIsLoading(true);
      setBookTomes(res);
    });
  }, [updated]);

  console.log(isVisible);

  if (!isLoading) return;
  console.log(_user.id, translatorId);
  return (
    <div className="max-w-[1144px] bg-white mx-auto mt-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <a href="#" className="bookChapterButton" onClick={() => setIsVisible(!isVisible)}>
            Добавить главу
          </a>
          <a href="#" className="bookChapterButton">
            Скачать
          </a>
          <a href="#" className="bookChapterButton">
            Выбрать главы
          </a>
        </div>
        <a href="#" className="bookPageButton">
          Добавить главу
        </a>
      </div>
      <MyTable
        cols={bookTomes.length && bookTomes}
        rowName={'chapters'}
        isEditor={isEditor}
        bookId={bookId}
      />
      {isVisible && (
        <AddChapter
          translatorId={translatorId}
          setUpdated={setUpdated}
          isVisible={isVisible}
          onClick={setIsVisible}
          bookId={bookId}
        />
      )}
    </div>
  );
};

export default Chapters;
