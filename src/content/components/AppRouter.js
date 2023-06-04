import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  TITLE_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  REGISTRATION_ROUTE,
  TEAM_ROUTE
} from '../utils/consts';
import AddTitlePage from '../screens/AddTitlePage';
import AdminPage from '../screens/AdminPage';
import TitlePage from '../screens/TitlePage';
import HomePage from '../screens/HomePage';
import AuthPage from '../screens/AuthPage';
import AddTeam from '../screens/AddTeam';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={REGISTRATION_ROUTE} element={<AuthPage />} />;
      <Route path={ADMIN_ROUTE} element={<AdminPage />} />;
      <Route path={TITLE_ROUTE} element={<TitlePage />} />;
      <Route path={TEAM_ROUTE + '/add'} element={<AddTeam />} />;
      <Route path={TITLE_ROUTE + '/add'} element={<AddTitlePage />} />;
      <Route path={HOME_ROUTE} element={<HomePage />} />;
    </Routes>
  );
};

export default AppRouter;
