import React from 'react';
import ReactDOM from 'react-dom/client';

import { MensalBalance } from './pages';
import GlobalStyles from './styles/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <MensalBalance />
  </React.StrictMode>,
);
