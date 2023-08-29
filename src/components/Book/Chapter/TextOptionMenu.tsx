import { useState } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type TextOptionMenuProps = {
  setTextSize: (value: number) => any
  setLineHeight: (value: number) => any
  setWidth: (value: number) => any
  setParagraphMargin: (value: number) => any
  setTextColor: (value: string) => any
  setBgColor: (value: string) => any
  bgColor: string
  textColor: string
}

export const TextOptionMenu: React.FC<TextOptionMenuProps> = props => {
  const {
    setTextSize,
    setLineHeight,
    setWidth,
    setParagraphMargin,
    setTextColor,
    setBgColor,
    bgColor,
    textColor
  } = props;
  const [headerColor, setHeaderColor] = useState('bg-white');
  const [isOpen, setIsOpen] = useState(false);
  const Ts = [
    {
      textColor: 'text-black',
      bgColor: 'bg-slate-100',
      headerColor: 'bg-white'
    },
    {
      textColor: 'text-stone-800',
      bgColor: 'bg-amber-100',
      headerColor: 'bg-amber-50'
    },
    {
      textColor: 'text-amber-200',
      bgColor: 'bg-stone-800',
      headerColor: 'bg-stone-700'
    },
    {
      textColor: 'text-slate-200',
      bgColor: 'bg-gray-950',
      headerColor: 'bg-gray-900'
    },
    {
      textColor: 'text-gray-300',
      bgColor: 'bg-neutral-950',
      headerColor: 'bg-neutral-900'
    }
  ];
  return (
    <div
      className={
        'absolute flex top-0 w-full h-16 bg-none z-[9999] border-b-2 ' +
        headerColor +
        ' ' +
        textColor
      }>
      <a className="my-auto" href="/">
        <img className="h-8 w-auto ml-4" alt="Your Company" />
      </a>
      <div className="w-[840px] mx-auto flex">
        <span className="my-auto">Текущая глава</span>
      </div>
      <div className="my-auto mr-4 flex flex-row transition-all duration-300">
        <div className="z-20">
          {/* {isOpen ? (
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
          )} */}
        </div>
        <div
          className={classNames(
            isOpen ? 'translate-x-0' : 'translate-x-full',
            'textOptionStyle mt-16',
            bgColor
          )}>
          <div className="text-lg mt-1 pb-2 mb-4">Стилизация страницы</div>

          <div className="flex flex-row justify-between w-full px-3 mb-2">
            {Ts.map(t => {
              const bor = ' border-' + t.textColor.substr(5);
              return (
                <div
                  onClick={() => {
                    setBgColor(t.bgColor);
                    setTextColor(t.textColor);
                    setHeaderColor(t.headerColor);
                  }}
                  className={'py-3 px-6 border-2 ' + t.bgColor + ' ' + t.textColor + bor}>
                  T
                </div>
              );
            })}
          </div>
          <Box className="mx-auto" sx={{ width: 350 }}>
            <span>Размер шрифта</span>
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
          <Box className="mx-auto" sx={{ width: 350 }}>
            <span>Размер шрифта</span>
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
          <Box className="mx-auto" sx={{ width: 350 }}>
            <span>Ширина контейнера</span>
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
          <Box className="mx-auto" sx={{ width: 350 }}>
            <span>Размеры отступа</span>
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
