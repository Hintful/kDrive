import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { MemoryRouter } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
