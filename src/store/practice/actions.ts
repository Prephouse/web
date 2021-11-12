import { SessionMedium, SessionSource, SessionType } from '../../utils/enums';

import {
  SET_ALLOW_LIVE_FEEDBACK,
  SET_PRACTICE_MEDIUM,
  SET_PRACTICE_SESSION_TYPE,
  SET_PRACTICE_SOURCE,
} from './types';

export const setPracticeSessionType = (sessionType: SessionType) => (dispatch: any) => {
  dispatch({
    type: SET_PRACTICE_SESSION_TYPE,
    payload: { sessionType },
  });
};

export const setPracticeMedium = (medium: SessionMedium) => (dispatch: any) => {
  dispatch({
    type: SET_PRACTICE_MEDIUM,
    payload: { medium },
  });
};

export const setPracticeSource = (source: SessionSource) => (dispatch: any) => {
  dispatch({
    type: SET_PRACTICE_SOURCE,
    payload: { source },
  });
};

export const setAllowLiveFeedback = (allowLiveFeedback: boolean) => (dispatch: any) => {
  dispatch({
    type: SET_ALLOW_LIVE_FEEDBACK,
    payload: { allowLiveFeedback },
  });
};
