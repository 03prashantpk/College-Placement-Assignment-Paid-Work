import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { required } from 'enally.in-credit';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Fragment>
      <App />
      <p dangerouslySetInnerHTML={{ __html: required }} />
    </React.Fragment>
  </React.StrictMode>,
);
