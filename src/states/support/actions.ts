import { SUPPORT_TAB_INDEX_KEY } from '../../strings/keys';

import { AppDispatch } from '../../store';
import { SET_SUPPORT_TAB } from './types';

export const setSupportTab = (tabIndex: number) => (dispatch: AppDispatch) => {
  sessionStorage.setItem(SUPPORT_TAB_INDEX_KEY, tabIndex.toString());
  dispatch({
    type: SET_SUPPORT_TAB,
    payload: { tabIndex },
  });
};
