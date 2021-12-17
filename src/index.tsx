import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import snakecaseKeys from 'snakecase-keys';

import { store } from './store/store';

import App from './components/App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_PREPHOUSE_BASE_URL;
axios.interceptors.request.use(config => {
  const c = config;
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
    const c = config;
    c.data = camelcaseKeys(config.data);
    return c;
  },
  error => {
    const e = error;
    if (error.response) {
      e.response.data = camelcaseKeys(error.response.data);
    }
    return Promise.reject(e);
  }
);

ReactDOM.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
