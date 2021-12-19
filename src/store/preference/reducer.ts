import { Reducer } from 'redux';

import { PREFERS_DARK_MODE_KEY } from '../../strings/keys';

import { CHANGE_PREFERS_DARK_MODE } from './types';
import type { PreferenceReduxAction, PreferenceReduxState } from './types';

const initializePrefersDarkMode = (): boolean => {
  if (PREFERS_DARK_MODE_KEY in localStorage) {
    return localStorage.getItem(PREFERS_DARK_MODE_KEY) === 'true';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initState: PreferenceReduxState = {
  prefersDarkMode: initializePrefersDarkMode(),
};

const preferenceReducer: Reducer<PreferenceReduxState, PreferenceReduxAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case CHANGE_PREFERS_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload.prefersDarkMode };
    default:
      return state;
  }
};

export default preferenceReducer;
