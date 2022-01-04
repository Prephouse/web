import { Reducer } from 'redux';

import { SUPPORT_TAB_INDEX_KEY } from '../../strings/keys';

import { parseSafeDecInt } from '../../utils/string';

import { SET_SUPPORT_TAB, SupportReduxAction, SupportReduxState } from './types';

const initState: SupportReduxState = {
  tabIndex: parseSafeDecInt(sessionStorage.getItem(SUPPORT_TAB_INDEX_KEY) ?? '0'),
  ticketSubmitStatus: {
    submitted: false,
    success: false,
    ticketId: null,
    messageId: '',
  },
};

const supportReducer: Reducer<SupportReduxState, SupportReduxAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case SET_SUPPORT_TAB:
      return {
        ...state,
        tabIndex: action.payload.tabIndex,
      };
    default:
      return state;
  }
};

export default supportReducer;
