import React, { useContext } from 'react';
import { Navigate, Route, Outlet } from 'react-router-dom';
import { Context } from '../..';

const UserRoute = props => {
  const { user } = useContext(Context);
  return user.isAuth ? props.children : <Navigate to="/" />;
};

export default UserRoute;
