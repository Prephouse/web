import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import snakecaseKeys from 'snakecase-keys';

import { store } from './store/store';

import App from './components/App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

axios.defaults.baseURL = process.env.REACT_APP_PREPHOUSE_BASE_URL;
axios.interceptors.request.use(config => {
  const c = { ...config };
  if (config.params) {
    c.params = snakecaseKeys(config.params);
  }
  if (config.data) {
    c.data = snakecaseKeys(config.data);
  }
  return c;
});
axios.interceptors.response.use(
  config => {
    const c = { ...config };
    c.data = camelcaseKeys(config.data);
    return c;
  },
  error => {
    const e = { ...error };
    if (error.response) {
      e.response.data = camelcaseKeys(error.response.data);
    }
    return Promise.reject(e);
  }
);

/*
if (process.env.NODE_ENV !== 'production') {
  import('@axe-core/react').then(axe => {
    axe.default(React, ReactDOM, 1_000);
    return;
  });
}
*/

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
