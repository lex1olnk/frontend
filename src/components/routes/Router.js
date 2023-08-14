import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  TITLE_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEAM_ROUTE,
  CHAPTER_ROUTE
} from '../../utils/consts';
import { Context } from '../..';
import { AuthPage } from '../Authentication/AuthPage';
import { Login } from '../Authentication/Login';

import CreateTitle from '../Title/CreateTitle';
import CreateTeam from '../Team/CreateTeam';
import AdminPage from '../Admin/AdminPage';
import ChapterPage from '../Title/Chapter/ChapterPage';
import TitlePage from '../Title/TitlePage';
import TeamsPage from '../Team/TeamsPage';
import TeamPage from '../Team/TeamPage';
import AddChapterText from '../Title/Chapter/AddChapterText';
import Layout from '../Layout/Layout';

const Router = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={CHAPTER_ROUTE} element={<ChapterPage />} />;
      <Route path={TEAM_ROUTE}>
        <Route path={':id'} element={<TeamPage />} />;
        <Route path={'add'} element={<CreateTeam />} />;
        <Route path={''} element={<TeamsPage />} />;
      </Route>
      <Route path={TITLE_ROUTE}>
        <Route path={':title/:id/import'} element={<AddChapterText />} />;
        <Route path={':id'} element={<TitlePage />} />;
        <Route path={'add'} element={<CreateTitle />} />;
      </Route>
      <Route path={HOME_ROUTE} element={<Layout />} />;
    </Routes>
  );
};

export default Router;
