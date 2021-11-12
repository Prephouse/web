import { combineReducers } from 'redux';

import practiceReducer from './practice/reducer';
import settingsReducer from './settings/reducer';

export const rootReducer = combineReducers({ practiceReducer, settingsReducer });
export type RootState = ReturnType<typeof rootReducer>;
