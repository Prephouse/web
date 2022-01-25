import { createReducer } from '@reduxjs/toolkit';

import { PREFERS_DARK_MODE_KEY, SESSION_LOCALE_KEY } from 'strings/keys';
import type { BcpName } from 'strings/locales';
import { DEFAULT_LOCALE } from 'strings/locales';

import { changeLocale, changePrefersDarkMode } from './actions';

interface PreferenceReduxState {
  prefersDarkMode: boolean;
  locale: BcpName;
}

const initState: PreferenceReduxState = {
  prefersDarkMode: (function (): boolean {
    if (PREFERS_DARK_MODE_KEY in localStorage) {
      return localStorage.getItem(PREFERS_DARK_MODE_KEY) === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  })(),
  locale: (function () {
    return (sessionStorage.getItem(SESSION_LOCALE_KEY) ?? DEFAULT_LOCALE) as BcpName;
  })(),
};

const preferenceReducer = createReducer(initState, builder => {
  builder
    .addCase(changePrefersDarkMode, (state, action) => {
      localStorage.setItem(PREFERS_DARK_MODE_KEY, action.payload.toString());
      state.prefersDarkMode = action.payload;
    })
    .addCase(changeLocale, (state, action) => {
      sessionStorage.setItem(SESSION_LOCALE_KEY, action.payload);
      state.locale = action.payload;
    });
});

export default preferenceReducer;
