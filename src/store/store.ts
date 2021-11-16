import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import practiceReducer from './practice/reducer';
import settingsReducer from './settings/reducer';

export const rootReducer = combineReducers({ practiceReducer, settingsReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
