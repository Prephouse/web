import { createReducer } from '@reduxjs/toolkit';

import { SUPPORT_TAB_INDEX_KEY } from '../../strings/keys';

import { parseStrictDecInt } from '../../utils/string';

import { setSupportTab } from './actions';

interface SupportReduxState {
  tabIndex: number;
  ticketSubmitStatus: {
    submitted: boolean;
    success: boolean;
    ticketId: string | null;
    messageId: string;
  };
}

const initState: SupportReduxState = {
  tabIndex: parseStrictDecInt(sessionStorage.getItem(SUPPORT_TAB_INDEX_KEY) ?? '0'),
  ticketSubmitStatus: {
    submitted: false,
    success: false,
    ticketId: null,
    messageId: '',
  },
};

const supportReducer = createReducer(initState, builder => {
  builder.addCase(setSupportTab, (state, action) => {
    sessionStorage.setItem(SUPPORT_TAB_INDEX_KEY, action.payload.toString());
    state.tabIndex = action.payload;
  });
});

export default supportReducer;
