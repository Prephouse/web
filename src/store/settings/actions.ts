import { Dispatch } from 'react';

import { PREFERS_DARK_MODE_KEY } from '../../strings/keys';

import { CHANGE_PREFERS_DARK_MODE } from './types';

export const changePrefersDarkMode = (prefersDarkMode: boolean) => (dispatch: Dispatch<any>) => {
  localStorage.setItem(PREFERS_DARK_MODE_KEY, prefersDarkMode.toString());
  dispatch({
    type: CHANGE_PREFERS_DARK_MODE,
    payload: { prefersDarkMode },
  });
};
