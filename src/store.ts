import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { feedbackApi } from './services/feedback';
import practiceReducer from './states/practice/reducer';
import preferenceReducer from './states/preference/reducer';
import supportReducer from './states/support/reducer';

export const rootReducer = combineReducers({
  practice: practiceReducer,
  preference: preferenceReducer,
  support: supportReducer,
  [feedbackApi.reducerPath]: feedbackApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(feedbackApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
