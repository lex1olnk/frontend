import React, { useContext } from 'react';
import { Routes, Route, Redirect } from 'react-router-dom';
import {
  TITLE_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  TEAM_ROUTE,
  CHAPTER_ROUTE
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

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={ADMIN_ROUTE} element={<AdminPage />} />;
      <Route path={CHAPTER_ROUTE} element={<ChapterPage />} />;
      <Route path={TEAM_ROUTE}>
        <Route path={':id'} element={<TeamPage />} />;
        <Route path={'add'} element={<AddTeam />} />;
        <Route path={''} element={<TeamsPage />} />;
      </Route>
      <Route path={TITLE_ROUTE}>
        <Route path={':title/:id/import'} element={<AddChapterText />} />;
        <Route path={':id'} element={<TitlePage />} />;
        <Route path={'add'} element={<AddTitlePage />} />;
      </Route>
      <Route path={HOME_ROUTE} element={<HomePage />} />;
    </Routes>
  );
};

export default AppRouter;
