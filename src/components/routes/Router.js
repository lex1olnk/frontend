import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  BOOK_ROUTE,
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

import CreateBook from '../Book/CreateBook';
import CreateTeam from '../Team/CreateTeam';
import AdminPage from '../Admin/AdminPage';
import ChapterPage from '../Book/Chapter/ChapterPage';
import BookPage from '../Book/BookPage';
import TeamsPage from '../Team/TeamsPage';
import TeamPage from '../Team/TeamPage';
import AddChapterText from '../Book/Chapter/AddChapterText';
import Layout from '../Layout/Layout';
import UserRoute from './UserRoute';
import ProfilePage from '../Profile/ProfilePage';

const Router = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={'user/:id'} element={<ProfilePage />} />;
      <Route path={TEAM_ROUTE}>
        <Route path={':id'} element={<TeamPage />} />;
        <Route
          exact
          path={'add'}
          element={
            <UserRoute>
              <CreateTeam />
            </UserRoute>
          }></Route>
        <Route path={''} element={<TeamsPage />} />;
      </Route>
      <Route path={BOOK_ROUTE}>
        <Route path={':book/:id'} element={<ChapterPage />} />;
        <Route path={':book/:id/import'} element={<AddChapterText />} />;
        <Route path={':id'} element={<BookPage />} />;
        <Route path={'add'} element={<CreateBook />} />;
      </Route>
      <Route path={HOME_ROUTE} element={<Layout />} />;
    </Routes>
  );
};

export default Router;
