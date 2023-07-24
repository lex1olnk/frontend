import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../..';
import { bookTomesGetByBookId } from '../../http/bookTomeApi';
import { titleGetById } from '../../http/titleApi';
import { toJS } from 'mobx';
import ConvertLexical from '../../plugins/ConvertLexical';
import { getDescString } from '../../http/univApi';
import parse from 'html-react-parser';

import AddChapter from '../modals/AddChapter';
import { MyTable } from '../Table';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { ReactComponent as Star } from '../../icons/ratingStar.svg';

const Group = ({ title, items }) => {
  const data = items;
  if (!data) return null;
  return (
    <div className="flex flex-row flex-wrap mt-2">
      {data.map(item => (
        <div
          className="bg-cred text-white text-sm px-3 py-1 my-1 mr-2 rounded-md"
          key={item.id + item.value}>
          {item.value}
        </div>
      ))}
    </div>
  );
};

const Info = props => {
  const { title, desc } = props;
  return (
    <div className="max-w-[1144px] bg-white mx-auto h-full flex flex-col">
      <div className="flex flex-col p-4">
        <span className="text-xl mb-4">Описание</span>
        <span className="text-md">{parse(desc)}</span>
        <div className="aspect-3/4 w-[240px] bg-purple-200 mx-auto my-4">img</div>
      </div>
      <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
      <Rating />
      <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
    </div>
  );
};

const Chapters = ({ titleId, translatorId }) => {
  const { user } = useContext(Context);
  const [isVisible, setIsVisible] = useState(false);
  const [bookTomes, setBookTomes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditor, setIsEditor] = useState(false);
  const _user = toJS(user.user);

  useEffect(() => {
    if (_user.id === translatorId) {
      setIsEditor(true);
    }
    bookTomesGetByBookId(titleId).then(res => {
      setIsLoading(true);
      setBookTomes(res);
    });
  }, []);

  return (
    <div className="max-w-[1144px] bg-white mx-auto mt-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <a href="#" className="titleChapterButton" onClick={() => setIsVisible(!isVisible)}>
            Добавить главу
          </a>
          <a href="#" className="titleChapterButton">
            Скачать
          </a>
          <a href="#" className="titleChapterButton">
            Выбрать главы
          </a>
        </div>
        <a href="#" className="titlePageButton">
          Добавить главу
        </a>
      </div>
      <MyTable cols={bookTomes} rowName={'chapters'} isEditor={false} />
      <AddChapter isVisible={isVisible} onClick={setIsVisible} titleId={titleId} />
    </div>
  );
};

const RatingStars = ({ value, rate }) => {
  const stars = [20.0, 20.0, 20.0, 20.0, 20.0];
  for (let i = 4; i >= 0; i--) {
    if (20 * i > rate) {
      stars[i] = 0;
    } else {
      stars[i] = rate - 20 * i;
      break;
    }
  }
  return (
    <div className="flex flex-row bg-[#FCA5A5] rounded-lg w-[360px] h-9 px-2 py-1 justify-between my-1">
      <span className="ml-1 text-white text-center text-lg">{value}</span>
      <div className="flex flex-row">
        {stars.map(star => {
          return (
            <div className="flex relative mx-1 my-auto">
              <Star
                className="fill-yellow-300 z-10"
                viewBox={-((20 - star) * 14) / 20 + ' 0 14 14'}
                width={'20px'}
                height={'20px'}
                transform={'translate(-' + ((20 - star) / 20) * 20 + ' 0)'}
              />
              <Star className="fill-white absolute z-0" width={'20px'} height={'20px'} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Rating = () => {
  const rates = [
    {
      value: 5,
      rate: 81
    },
    {
      value: 4,
      rate: 10
    },
    {
      value: 3,
      rate: 1
    },
    {
      value: 2,
      rate: 2
    },
    {
      value: 1,
      rate: 6
    }
  ];
  const rating = {
    translate: 0,
    audio: 0,
    title: 0
  };
  return (
    <div className="flex flex-row justify-between mx-4">
      <div className="flex flex-col mt-2">
        <span className="text-xl">Общее количество оценок: 0</span>
        <div className="flex flex-row my-auto">
          <div className="flex flex-col text-base [&>span]:my-1 [&>span]:text-lg">
            <span>Рейтинг перевода:</span>
            <span>Рейтинг аудиозаписи:</span>
            <span>Рейтинг тайтла:</span>
          </div>
          <div className="flex flex-col text-base ml-12 [&>span]:my-1 [&>span]:text-lg">
            <span>{rating.translate}</span>
            <span>{rating.audio}</span>
            <span>{rating.title}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {rates.map(item => (
          <RatingStars key={item.value} value={item.value} rate={item.rate} />
        ))}
      </div>
    </div>
  );
};

const TitlePage = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { id } = useParams();

  useEffect(() => {
    titleGetById(id).then(res => {
      setTitle(res);
      getDescString('titles', res.name + '.txt').then(res => {
        ConvertLexical({ descString: res, setDesc });
      });
      console.log('1');
    });
  }, []);

  const TitleDesc = props => {
    const { name, value } = props;
    return (
      <div className="px-16 first:pl-0" key={name + value}>
        <span className="text-sm">{name}</span>
        <br />
        <span className="text-lg">{value}</span>
      </div>
    );
  };

  if (!title) return <div>...LOADING</div>;

  const titleDescs = [
    {
      name: 'Переводчик',
      value: title.translatorId
    },
    {
      name: 'Автор',
      value: title.author.value
    },
    {
      name: 'Глав',
      value: 102
    },
    {
      name: 'Просмотров',
      value: title.views
    }
  ];

  console.log(title);
  return (
    <div className="bg-slate-100">
      <div className="w-full py-4">
        <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between">
          <div>
            <img
              src={process.env.REACT_APP_API_URL + '/img/' + title.img}
              className="rounded-md h-[240px] w-[200px] object-cover"
            />
            <div className="flex flex-row mt-2 justify-between">
              <button className="w-[92px] text-sm py-2 bg-white">Читать</button>
              <button className="w-[92px] text-sm py-2 bg-white">В закладки</button>
            </div>
          </div>

          <div className="rounded-md w-[925px] bg-white">
            <div className="flex flex-row justify-between pt-2 px-4 text-2xl ">
              <div>
                <span className="text-2xl">{title.name}</span>
                <span className="mx-4 text-base py-1 px-3 bg-white h-fit rounded-md">Category</span>
                <span className="text-base py-1 px-3 bg-white h-fit rounded-md">Status</span>
                <br />
                <span className="text-base">{title.origName}</span>
              </div>
              <div className="flex flex-row">
                <a href="#" className="block h-8 text-center w-8 bg-cred">
                  v
                </a>
                <a className="block h-8 text-center ml-4 w-8 bg-cred">t</a>
              </div>
            </div>
            <div className="pt-2 px-4">
              <div className="flex flex-row">
                {titleDescs.map(desc => (
                  <TitleDesc name={desc.name} value={desc.value} />
                ))}
              </div>
              <Group title={'Теги'} items={[...title.genres, ...title.tags, ...title.fandoms]} />
            </div>
          </div>
        </div>
        <TabContext value={value}>
          <div>
            <Box className="mt-4">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="max-w-[1144px] mx-auto"
                TabIndicatorProps={{
                  sx: { backgroundColor: '#AAA' }
                }}
                sx={{
                  '& button': {
                    color: 'white',
                    backgroundColor: '#FF5A5A'
                  },
                  '& button:active': { color: 'black', backgroundColor: 'white' },
                  '& button:hover': { color: 'white', backgroundColor: '#FF7C8C' },
                  '& button.Mui-selected': { color: 'black', backgroundColor: 'white' }
                }}>
                <Tab label="Подробности" value="1" />
                <Tab label="Главы" value="2" />
                <Tab label="Обсуждения" value="3" />
              </TabList>
            </Box>
            <TabPanel sx={{ padding: 0 }} value="1">
              <Info title={title} desc={desc} />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="2">
              <Chapters titleId={title.id} />
            </TabPanel>
            <TabPanel sx={{ padding: 0 }} value="3">
              Item Three
            </TabPanel>
          </div>
        </TabContext>
      </div>
    </div>
  );
};

export default TitlePage;
