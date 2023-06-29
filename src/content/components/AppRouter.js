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
import { AuthPage, Login } from '../screens/AuthPage';

import AddTitlePage from '../screens/Edits/AddTitlePage';
import AddTeam from '../screens/Edits/AddTeam';
import AdminPage from '../screens/AdminPage';
import TitlePage from '../screens/TitlePage';
import HomePage from '../screens/HomePage';

const AppRouter = () => {
  const { user } = useContext(Context);

  console.log(user);

  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={LOGIN_ROUTE} element={<Login />} />;
      <Route path={ADMIN_ROUTE} element={<AdminPage />} />;
      <Route path={TITLE_ROUTE + '/:id'} element={<TitlePage />} />;
      <Route path={TEAM_ROUTE + '/add'} element={<AddTeam />} />;
      <Route path={TITLE_ROUTE + '/add'} element={<AddTitlePage />} />;
      <Route path={HOME_ROUTE} element={<HomePage />} />;
    </Routes>
  );
};

export default AppRouter;
