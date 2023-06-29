import { BrowserRouter } from 'react-router-dom';
import AppRouter from './content/components/AppRouter';
import HeaderComponent from './content/components/Header';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { check } from './content/http/userApi';

const App = observer(() => {
  const {user} = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).catch((error) => {
      console.log(error)
    }).finally(() => setLoading(false))
  }, []);

  if (loading) return <div>LOADING...</div> 

  return (
    <BrowserRouter>
      <HeaderComponent />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
