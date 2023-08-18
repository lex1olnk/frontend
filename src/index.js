import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{ user: new UserStore() }}>
     <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Context.Provider>
);
