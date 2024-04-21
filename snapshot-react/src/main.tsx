import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import Toast from './components/toast/Toast';
// import OAuth2RedirectHandler from './pages/Auth/OAuth2RedirectHandler';
import { setUpStore } from './store/store';

const store = setUpStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <Toast />
    </Provider>
  </React.StrictMode>,
);
