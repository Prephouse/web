import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import practiceReducer from './practice/reducer';
import preferenceReducer from './preference/reducer';

export const rootReducer = combineReducers({
  practice: practiceReducer,
  preference: preferenceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
