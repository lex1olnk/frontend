import { BrowserRouter } from 'react-router-dom';
import AppRouter from './content/components/AppRouter';
import HeaderComponent from './content/components/Header';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
