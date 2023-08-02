import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Pages/MainPage/Main';
import { Analytics } from '@vercel/analytics/react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main />
    <Analytics />
  </React.StrictMode>
);