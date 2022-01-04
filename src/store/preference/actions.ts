import { PREFERS_DARK_MODE_KEY, SESSION_LOCALE_KEY } from '../../strings/keys';
import type { BcpName } from '../../strings/locales';

import type { AppDispatch } from '../store';
import { CHANGE_LOCALE, CHANGE_PREFERS_DARK_MODE } from './types';

export const changePrefersDarkMode = (prefersDarkMode: boolean) => (dispatch: AppDispatch) => {
  localStorage.setItem(PREFERS_DARK_MODE_KEY, prefersDarkMode.toString());
  dispatch({
    type: CHANGE_PREFERS_DARK_MODE,
    payload: { prefersDarkMode },
  });
};

export const changeLocale = (locale: BcpName) => (dispatch: AppDispatch) => {
  sessionStorage.setItem(SESSION_LOCALE_KEY, locale);
  dispatch({
    type: CHANGE_LOCALE,
    payload: { locale },
  });
};
