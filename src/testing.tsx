import { configureStore } from '@reduxjs/toolkit';
import { EnhancedStore } from '@reduxjs/toolkit/src/configureStore';
import { RenderOptions, render } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { IntlProvider } from 'react-intl';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { combineReducers } from 'redux';

import practiceReducer from './states/practice/reducer';
import preferenceReducer from './states/preference/reducer';
import supportReducer from './states/support/reducer';

import enUs from './strings/translations/en-US/index.json';

function customRender(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: combineReducers({
        practice: practiceReducer,
        preference: preferenceReducer,
        support: supportReducer,
      }),
      preloadedState,
    }),
    ...options
  }: {
    preloadedState?: Record<string, unknown>;
    store?: EnhancedStore;
    options?: Omit<RenderOptions, 'wrapper'>;
  } = {}
) {
  const AllTheProviders: FC = ({ children }) => (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <IntlProvider locale="en-US" messages={enUs}>
          {children}
        </IntlProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
  return render(ui, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
