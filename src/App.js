import { BrowserRouter } from 'react-router-dom';
import AppRouter from './content/components/AppRouter';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
