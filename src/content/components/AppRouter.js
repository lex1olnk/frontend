import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HOME_ROUTE } from '../utils/consts';
import HomePage from '../screens/HomePage';
//import HomePage from '../screens/HomePage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
