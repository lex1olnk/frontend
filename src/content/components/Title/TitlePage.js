import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { titleGetById, titleGetByTranslatorId, titleIncrementViews } from '../../http/titleApi';
import ConvertLexical from '../../plugins/ConvertLexical';
import { getDescString } from '../../http/univApi';
import parse from 'html-react-parser';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { ReactComponent as VKIcon } from '../../icons/vk.svg';
import Chapters from './Chapters';
import Rating from './Rating';
import { GalleryItem } from '../Gallery';
import Discussion from '../Discussion/Discussion';

const Group = ({ title, items }) => {
  const data = items;
  if (!data) return null;
  return (
    <div className="flex flex-row flex-wrap mt-2">
      {data.map(item => (
        <div
          className="bg-cred text-white text-sm px-3 py-1 my-1 mr-2 rounded-md border-b-2"
          key={item.id + item.value}>
          {item.value}
        </div>
      ))}
    </div>
  );
};

const TitlesByTranslator = props => {
  const { id, translatorId } = props;
  const [titles, setTitles] = useState([]);

  useEffect(() => {
    titleGetByTranslatorId(translatorId).then(res => {
      setTitles(res.filter(x => x.id != id));
    });
  }, []);

  if (!titles) return;

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

const Info = props => {
  const { title, desc } = props;
  return (
    <div className="max-w-[1144px] bg-white mx-auto h-full flex flex-col">
      <div className="flex flex-col p-4">
        <span className="text-xl mb-4">Описание</span>
        <span className="text-md">{parse(desc)}</span>
      </div>
      <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
      <Rating />
      <div className="w-full h-[0.1rem] bg-slate-200 rounded-md mx-auto my-4"></div>
      <TitlesByTranslator id={title.id} translatorId={title.translatorId} />
      <Discussion id={title.discussionId} />
    </div>
  );
};

const TitleDesc = props => {
  const { name, value } = props;
  return (
    <div className="px-6 first:pl-0" key={name + value}>
      <span className="text-sm">{name}</span>
      <br />
      <span className="text-lg">{value}</span>
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
    titleIncrementViews(id);
    titleGetById(id).then(res => {
      setTitle(res);
      getDescString('titles', res.name + '.txt').then(res => {
        ConvertLexical({ descString: res, setDesc });
      });
      console.log('1');
    });
  }, []);

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
    <div className="bg-slate-100 h-full ">
      <div className="w-full py-4">
        <div className="max-w-[1144px] h-full mx-auto">
          <span className="text-2xl">{title.name}</span>
          <br />
          <span className="text-base">{title.origName}</span>
        </div>
        <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between mt-4">
          <div className="border-b-2">
            <img
              src={process.env.REACT_APP_API_URL + '/img/' + title.img}
              className="rounded-md h-[240px] w-[200px] object-cover"
            />
          </div>
          <div className="rounded-md w-[925px] bg-white border-b-2">
            <div className="flex flex-row justify-between pt-2 px-4 text-2xl "></div>
            <div className="px-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  {titleDescs.map(desc => (
                    <TitleDesc name={desc.name} value={desc.value} />
                  ))}
                </div>
                <div className="flex">
                  <span className="mr-6 bg-cred py-1 px-3 my-auto border-b-2">Авторское</span>
                  <span className="bg-cred py-1 px-3 my-auto border-b-2">В процессе</span>
                </div>
              </div>
              <div className="flex flex-row">
                <VKIcon className="vk" />
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
              <Chapters titleId={title.id} translatorId={title.translatorId} />
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
