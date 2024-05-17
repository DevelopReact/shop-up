// react
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// app
import App from '@/app/App.tsx';
// providers
import { PersistProvider, StoreProvider } from '@/app/providers/store';
// styles
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <PersistProvider>
          <App />
        </PersistProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
);
