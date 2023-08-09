import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './http/userApi';

import Router from './components/routes/Router';
import HeaderComponent from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check()
      .then(data => {
        user.setUser(data.token);
        user.setIsAuth(true);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>LOADING...</div>;

  return (
    <BrowserRouter>
      <HeaderComponent />
      <Router />
      <Footer />
    </BrowserRouter>
  );
});

export default App;
