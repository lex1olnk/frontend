import React, { useEffect } from 'react'

import Router from './components/routes/Router'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { verifyUser } from './actions/userActions'
import { useAppDispatch, useAppSelector } from './hooks/hooks'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(({ root }) => root.user)
  console.log(user);
  useEffect(() => {
    dispatch(verifyUser())
  }, [])

  return (
    <React.Fragment>
      <Header />

      <Router />

      <Footer />
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </React.Fragment>
  )
}

export default App
