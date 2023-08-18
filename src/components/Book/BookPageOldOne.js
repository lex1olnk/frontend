import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getBookById,
  getBookByTranslatorId,
  incrementBookViews,
  postBookmarkByBookId
} from '../../http/bookApi';
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
import { useQuery } from 'react-query';

const BookPage = () => {
  const [desc, setDesc] = useState('');
  const [value, setValue] = useState('1');
  const navigate = useNavigate();

  const { id } = useParams();

  const { isLoading, isSuccess, error, isError, data } = useQuery(['id', id], getBookById, {
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });

  useEffect(() => {
    if (isSuccess) {
      incrementBookViews(id);
      getDescString(`books/${data.id}/${data.id}.txt`).then(res => {
        if (res) ConvertLexical({ descString: res, setDesc });
      });
    }
  }, [isSuccess]);

  const onClickButton = () => {
    const res = postBookmarkByBookId(id, 0);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const bookDescs = [
    {
      name: 'Глав',
      value: 'chaptersCount'
    },
    {
      name: 'Просмотров',
      value: 'views'
    },
    {
      name: 'Год',
      value: 'year'
    }
  ];

  return (
    <>
      {isLoading && <div>...Loading team </div>}
      {isError && <div>{error.message}</div>}
      {isSuccess && (
        <div className="bg-slate-100 min-h-[calc(100vh_-_65px_-_148px)]">
          <div className="w-full py-4">
            <div className="max-w-[1144px] h-full mx-auto bg-cred text-white px-4 py-2">
              <span className="text-2xl">{data.name}</span>
              <br />
              <span className="text-base">{data.origName}</span>
            </div>
            <div className="max-w-[1144px] h-full mx-auto flex flex-row justify-between p-4 bg-white">
              <div className="border-b-2">
                <img
                  src={process.env.REACT_APP_API_URL + '/img/' + data.img}
                  className="rounded-md h-[320px] w-[240px] object-cover"
                />
              </div>
              <div className="rounded-md w-[886px] pl-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <div className="pr-6">
                      <span className="text-sm">Автор</span>
                      <br />
                      <span className="text-lg">{data.author.value}</span>
                    </div>
                    {bookDescs.map(desc => (
                      <div className="px-6 " key={desc.name + desc.value}>
                        <span className="text-sm">{desc.name}</span>
                        <br />
                        <span className="text-lg">{data[desc.value]}</span>
                      </div>
                    ))}
                    <div className="pl-6">
                      <span className="text-sm">Язык оригинала</span>
                      <br />
                      <span className="text-lg">{data.language?.value}</span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="mr-6 bg-cred py-1 px-3 my-auto border-b-2">Авторское</span>
                    <span className="bg-cred py-1 px-3 my-auto border-b-2">В процессе</span>
                  </div>
                </div>
                <div className="flex flex-row py-2">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/img/${data.translator.img}`}
                    className="my-auto rounded-full border-spacing-1 aspect-square w-12 object-cover"
                  />{' '}
                  <div className="py-1 px-4 text-white my-2 bg-cred mx-4">
                    {data.translator.nickname}
                  </div>
                </div>
                <div className="flex flex-row py-2">
                  <VKIcon className="vk" />
                </div>
                <div className="h-[156px] flex flex-col justify-between">
                  <Group book={'Теги'} items={[...data.genres, ...data.tags, ...data.fandoms]} />
                  <div className="bookHeadButtons">
                    <button onClick={() => navigate(`/book/${id}/${1}`)}>Начать читать</button>
                    <button onClick={onClickButton}>В закладки</button>
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
                  <Info book={data} desc={desc} />
                </TabPanel>
                <TabPanel sx={{ padding: 0 }} value="2">
                  <Chapters bookId={data.id} translatorId={data.translator.id} />
                </TabPanel>
                <TabPanel sx={{ padding: 0 }} value="3">
                  Item Three
                </TabPanel>
              </div>
            </TabContext>
          </div>
        </div>
      )}
    </>
  );
};

export default BookPage;
