import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { prephouseApi } from 'services/prephouse';

import practiceReducer from 'states/practice/reducer';
import preferenceReducer from 'states/preference/reducer';
import supportReducer from 'states/support/reducer';

export const rootReducer = combineReducers({
  practice: practiceReducer,
  preference: preferenceReducer,
  support: supportReducer,
  [prephouseApi.reducerPath]: prephouseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(prephouseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
