import { Reducer } from 'redux';

import { PREFERS_DARK_MODE_KEY, SESSION_LOCALE_KEY } from '../../strings/keys';
import type { BcpName } from '../../strings/locales';

import type { PreferenceReduxAction, PreferenceReduxState } from './types';
import { CHANGE_LOCALE, CHANGE_PREFERS_DARK_MODE } from './types';

const initializePrefersDarkMode = (): boolean => {
  if (PREFERS_DARK_MODE_KEY in localStorage) {
    return localStorage.getItem(PREFERS_DARK_MODE_KEY) === 'true';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const initializeLocale = () => (sessionStorage.getItem(SESSION_LOCALE_KEY) ?? 'en-US') as BcpName;

const initState: PreferenceReduxState = {
  prefersDarkMode: initializePrefersDarkMode(),
  locale: initializeLocale(),
};

const preferenceReducer: Reducer<PreferenceReduxState, PreferenceReduxAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case CHANGE_PREFERS_DARK_MODE:
      return { ...state, prefersDarkMode: action.payload.prefersDarkMode };
    case CHANGE_LOCALE:
      return { ...state, locale: action.payload.locale };
    default:
      return state;
  }
};

export default preferenceReducer;
