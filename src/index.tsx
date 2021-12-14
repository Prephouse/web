import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import snakecaseKeys from 'snakecase-keys';

import { store } from './store/store';

import App from './components/App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = process.env.REACT_APP_PREPHOUSE_BASE_URL;
axios.interceptors.request.use(config => {
  if (config.params) {
    config.params = snakecaseKeys(config.params);
  }
  if (config.data) {
    config.data = snakecaseKeys(config.data);
  }
  return config;
});
axios.interceptors.response.use(
  config => {
    config.data = camelcaseKeys(config.data);
    return config;
  },
  error => {
    if (error.response) {
      error.response.data = camelcaseKeys(error.response.data);
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
