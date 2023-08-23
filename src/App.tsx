import React, { useEffect, useState } from 'react';

import Router from './components/routes/Router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { State } from './interfaces';
import { verifyUser } from './actions/userActions';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from './hooks/hooks';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {user} = useSelector((state: State) => state.user)

  useEffect(() => {
    dispatch(verifyUser());
  }, [])


  return (
    <React.Fragment>
      <Header />

      <Router />

      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </React.Fragment>
  );
};

export default App;
