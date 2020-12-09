import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.css';
import { StoreProvider } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
