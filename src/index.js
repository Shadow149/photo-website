import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PageRouter from './page_router/PageRouter';
// import PhotoInput from './photo_backend/PhotoInput';

ReactDOM.render(
  <React.StrictMode>
    <PageRouter />
  </React.StrictMode>,
  document.getElementById('root')
);
