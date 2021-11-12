import { combineReducers } from 'redux';

import settingsReducer from './settings/reducer';

export const rootReducer = combineReducers({ settingsReducer });
export type RootState = ReturnType<typeof rootReducer>;
