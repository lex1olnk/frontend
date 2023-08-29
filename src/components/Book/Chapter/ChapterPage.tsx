import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getHTML } from '../../../actions/univAction';

import { TextOptionMenu } from './TextOptionMenu';
import { getChapter, postChapterComment } from '../../../actions/chapterApi';
import { useQuery } from 'react-query';

const ChapterPage = () => {
  const [textColor, setTextColor] = useState('text-black');
  const [bgColor, setBgColor] = useState('bg-slate-50');
  const [textSize, setTextSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1);
  const [width, setWidth] = useState(800);
  const [paragraphMargin, setParagraphMargin] = useState(2);
  const [desc, setDesc] = useState('');

  const { book, id } = useParams();

  const { isLoading, isSuccess, error, isError, data } = useQuery<any, any>(['id', id], getChapter, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    if (isSuccess && data) getHTML(`books/${book}/${id}/${id}.txt`);
  }, [isSuccess]);

  console.log(data);

  return (
    <>
      {isLoading && <div>...Loading team </div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <>
          <TextOptionMenu
            setTextSize={setTextSize}
            setLineHeight={setLineHeight}
            setWidth={setWidth}
            setParagraphMargin={setParagraphMargin}
            setBgColor={setBgColor}
            setTextColor={setTextColor}
            bgColor={bgColor}
            textColor={textColor}
          />
          <div
            className={
              'min-h-[calc(100vh_-_65px_-_148px)] transition-all ' + bgColor + ' ' + textColor
            }>
            <div style={{ width: width }} className={'mx-auto p-4'}>
              <span>Глава №</span>
              <div
                style={{
                  fontSize: textSize,
                  lineHeight: lineHeight
                }}>
                {!desc && <div>Глава еще не загружена</div>}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChapterPage;
