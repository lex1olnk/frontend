import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDescString } from '../../http/univApi';
import ConvertLexical from '../../plugins/ConvertLexical';
import parse, { domToReact } from 'html-react-parser';
import Discussion from '../Discussion/Discussion';
import Logo from '../../icons/logo.png';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TextOptionMenu = props => {
  const { setTextSize, setLineHeight, setWidth, setParagraphMargin } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="absolute flex top-0 w-full h-16 bg-none z-0">
      <a className="my-auto" href="/">
        <img className="h-8 w-auto ml-4" src={Logo} alt="Your Company" />
      </a>
      <div className="w-[840px] mx-auto flex">
        <span className="my-auto">Текущая глава</span>
      </div>
      <div className="my-auto mr-4 flex flex-row transition-all duration-300">
        <div className="z-20">
          {isOpen ? (
            <XMarkIcon
              onClick={() => setIsOpen(cur => !cur)}
              className="block h-6 w-6"
              aria-hidden="true"
            />
          ) : (
            <Bars3Icon
              onClick={() => setIsOpen(cur => !cur)}
              className="block h-6 w-6"
              aria-hidden="true"
            />
          )}
        </div>
        <div className={classNames(isOpen ? 'scale-x-100' : 'scale-x-0', 'textOptionStyle')}>
          <div className="text-lg mb-4">Стилизация страницы</div>
          <span>Размер шрифта</span>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Small steps"
              defaultValue={16}
              getAriaValueText={setTextSize}
              step={2}
              marks
              min={12}
              max={28}
              valueLabelDisplay="auto"
            />
          </Box>
          <span>Размер шрифта</span>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Small steps"
              defaultValue={1.4}
              getAriaValueText={setLineHeight}
              step={0.1}
              marks
              min={1}
              max={2}
              valueLabelDisplay="auto"
            />
          </Box>
          <span>Ширина контейнера</span>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Small steps"
              defaultValue={840}
              getAriaValueText={setWidth}
              step={80}
              marks
              min={800}
              max={1920}
              valueLabelDisplay="auto"
            />
          </Box>
          <span>Размеры отступа</span>
          <Box sx={{ width: 300 }}>
            <Slider
              aria-label="Small steps"
              defaultValue={12}
              getAriaValueText={setParagraphMargin}
              step={4}
              marks
              min={4}
              max={32}
              valueLabelDisplay="auto"
            />
          </Box>
        </div>
      </div>
    </div>
  );
};

const ChapterPage = () => {
  const [textSize, setTextSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1);
  const [width, setWidth] = useState(800);
  const [paragraphMargin, setParagraphMargin] = useState(2);
  const { title, id } = useParams();
  const [desc, setDesc] = useState();

  useEffect(() => {
    getDescString('titles/' + title + '/', id + '.txt').then(res => {
      ConvertLexical({ descString: res, setDesc });
    });
    console.log('1');
  }, []);

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
      />
      <div className="min-h-[calc(100vh_-_65px_-_148px)] bg-slate-200">
        <div style={{ width: width }} className={'bg-white mx-auto p-4'}>
          <span>Глава №</span>
          <div
            style={{
              fontSize: textSize,
              lineHeight: lineHeight
            }}>
            {parse(desc, options)}
          </div>
        </div>
        <Discussion id={id} className="w-[840px] mx-auto pt-4" />
      </div>
    </>
  );
};

export default ChapterPage;
