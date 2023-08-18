import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../../http/univApi';
import ConvertLexical from '../../../plugins/ConvertLexical';
import parse, { domToReact } from 'html-react-parser';
import Discussion from '../../Discussion/Discussion';

import { TextOptionMenu } from './TextOptionMenu';

const ChapterPage = () => {
  const [textColor, setTextColor] = useState('text-black');
  const [bgColor, setBgColor] = useState('bg-slate-50');
  const [textSize, setTextSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1);
  const [width, setWidth] = useState(800);
  const [paragraphMargin, setParagraphMargin] = useState(2);
  const { book, id } = useParams();
  const [desc, setDesc] = useState('');

  useEffect(() => {
    getDescString(`books/${book}/${id}.txt`).then(res => {
      if (res) ConvertLexical({ descString: res, setDesc });
    });
    console.log('1');
  }, []);

  console.log(desc);

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

  if (!desc) return;

  return (
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
        <Discussion id={id} className="w-[840px] mx-auto pt-4" />
      </div>
    </>
  );
};

export default ChapterPage;
