import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../../http/univApi';
import ConvertLexical from '../../../plugins/ConvertLexical';
import parse, { domToReact } from 'html-react-parser';
import Discussion from '../../Discussion/Discussion';

import { TextOptionMenu } from './TextOptionMenu';
import { getChapterById, postChapterComment } from '../../../http/chapterApi';
import { useQuery } from 'react-query';
import { Context } from '../../..';
import { toJS } from 'mobx';

const ChapterPage = () => {
  const [textColor, setTextColor] = useState('text-black');
  const [bgColor, setBgColor] = useState('bg-slate-50');
  const [textSize, setTextSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1);
  const [width, setWidth] = useState(800);
  const [paragraphMargin, setParagraphMargin] = useState(2);
  const [desc, setDesc] = useState('');

  const { user } = useContext(Context);
  const _user = toJS(user.user);

  const { book, id } = useParams();

  const { isLoading, isSuccess, error, isError, data } = useQuery(['id', id], getChapterById, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    if (isSuccess && data)
      getDescString(`books/${book}/${id}/${id}.txt`).then(res => {
        if (res) ConvertLexical({ descString: res, setDesc });
      });
  }, [isSuccess]);

  const onSubmit = values => {
    postChapterComment(values);
  };

  console.log(data);

  const options = {
    replace: ({ name, children }) => {
      if (!name) return;
      if (name == 'p') {
        return (
          <p style={{ marginTop: paragraphMargin, marginBottom: paragraphMargin }}>
            {domToReact(children, options)}
          </p>
        );
      }
    }
  };

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
                {desc && parse(desc, options)}
                {!desc && <div>Глава еще не загружена</div>}
              </div>
            </div>
            <Discussion
              onSubmit={onSubmit}
              id={id}
              discussionId={data.discussionId}
              className="w-[840px] mx-auto pt-4"
              userId={_user.id}
              path={`books/${book}/${id}`}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ChapterPage;
