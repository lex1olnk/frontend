import React, { useContext } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import {
  TITLE_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEAM_ROUTE
} from '../utils/consts';
import { Context } from '../..';
import { AuthPage, Login } from './Authenticaon/AuthPage';

import AddTitlePage from './Title/AddTitlePage';
import AddTeam from './Team/AddTeam';
import AdminPage from './Admin/AdminPage';
import ChapterPage from './Chapter/ChapterPage';
import TitlePage from './Title/TitlePage';
import HomePage from './Home/HomePage';
import TeamsPage from './Team/TeamsPage';
import TeamPage from './Team/TeamPage';
import AddChapterText from './Chapter/AddChapterText';

const AppRouter = () => {
  const { user } = useContext(Context);

  console.log(user);

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={ADMIN_ROUTE} element={<AdminPage />} />;
      <Route path={TITLE_ROUTE + '/:title/:id/import'} element={<AddChapterText />} />;
      <Route path={TITLE_ROUTE + '/:title/:id'} element={<ChapterPage />} />;
      <Route path={TITLE_ROUTE + '/:id'} element={<TitlePage />} />;
      <Route path={TEAM_ROUTE + '/:id'} element={<TeamPage />} />;
      <Route path={TEAM_ROUTE} element={<TeamsPage />} />;
      <Route path={TEAM_ROUTE + '/add'} element={<AddTeam />} />;
      <Route path={TITLE_ROUTE + '/add'} element={<AddTitlePage />} />;
      <Route path={HOME_ROUTE} element={<HomePage />} />;
    </Routes>
  );
};

export default AppRouter;
