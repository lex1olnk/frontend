import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../http/univApi';
import ConvertLexical from '../../plugins/ConvertLexical';
import parse from 'html-react-parser';

const ChapterPage = () => {
  const { title, id } = useParams();
  const [desc, setDesc] = useState();

  useEffect(() => {
    getDescString('titles/' + title + '/', id + '.txt').then(res => {
      ConvertLexical({ descString: res, setDesc });
    });
    console.log('1');
  }, []);

  if (!desc) return;

  return (
    <div>
      <div>Title</div>
      <div>content</div>
      {parse(desc)}
    </div>
  );
};

export default ChapterPage;
