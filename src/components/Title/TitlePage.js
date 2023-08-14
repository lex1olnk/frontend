import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { titleGetById, titleGetByTranslatorId, titleIncrementViews } from '../../http/titleApi';
import ConvertLexical from '../../plugins/ConvertLexical';
import { getDescString } from '../../http/univApi';
import './style.css';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { ReactComponent as VKIcon } from '../../icons/vk.svg';
import Chapters from './Chapters';
import { Group } from './Group';
import { Info } from './Info';

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
    titleGetById(id).then(res => {
      getDescString(`titles/${res.id}/${res.name}.txt`).then(res => {
        ConvertLexical({ descString: res, setDesc });
        console.log('1');
      });
      setTitle(res);
    });
  }, []);

  useEffect(() => {
    titleIncrementViews(id);
  }, []);

  if (!title) return <div>...LOADING</div>;

  const titleDescs = [
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
    },
    {
      name: 'Год',
      value: title.year
    },
    {
      name: 'Язык оригинала',
      value: title.language?.value
    }
  ];

  console.log(title);
  return (
    <div className="bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]">
      <div className="w-full py-4">
        <div className="max-w-[1144px] h-full mx-auto bg-cred text-white px-4 py-2">
          <span className="text-2xl">{title.name}</span>
          <br />
          <span className="text-base">{title.origName}</span>
        </div>
        <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between p-4 bg-white">
          <div className="border-b-2">
            <img
              src={process.env.REACT_APP_API_URL + '/img/' + title.img}
              className="rounded-md h-[320px] w-[240px] object-cover"
            />
          </div>
          <div className="rounded-md w-[886px] pl-4">
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
            <div className="flex flex-row py-2">
              <img
                src={process.env.REACT_APP_API_URL + '/img/' + title.img}
                className="my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover"
              />{' '}
              <div className="py-1 px-4 text-white my-2 bg-cred mx-4">{title.user.nickname}</div>
            </div>
            <div className="flex flex-row py-2">
              <VKIcon className="vk" />
            </div>
            <div className="h-[156px] flex flex-col justify-between">
              <Group title={'Теги'} items={[...title.genres, ...title.tags, ...title.fandoms]} />
              <div className="titleHeadButtons">
                <button>Начать читать</button>
                <button>В закладки</button>
              </div>
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
