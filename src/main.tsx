import React from 'react';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';
// On importe notre composant principal
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import store from './store';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
