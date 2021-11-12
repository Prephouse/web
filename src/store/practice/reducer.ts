import { Reducer } from 'redux';

import { SessionMedium, SessionSource, SessionType } from '../../utils/enums';

import {
  PracticeReduxAction,
  PracticeReduxState,
  SET_ALLOW_LIVE_FEEDBACK,
  SET_PRACTICE_MEDIUM,
  SET_PRACTICE_SESSION_TYPE,
  SET_PRACTICE_SOURCE,
} from './types';

const initState: PracticeReduxState = {
  sessionType: SessionType.INTERVIEW,
  medium: SessionMedium.VIDEO_AND_AUDIO,
  source: SessionSource.RECORD,
  allowLiveFeedback: true,
};

const practiceReducer: Reducer<PracticeReduxState, PracticeReduxAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case SET_ALLOW_LIVE_FEEDBACK:
      return { ...state, allowLiveFeedback: action.payload.allowLiveFeedback };
    case SET_PRACTICE_SESSION_TYPE:
      return { ...state, sessionType: action.payload.sessionType };
    case SET_PRACTICE_MEDIUM:
      return { ...state, medium: action.payload.medium };
    case SET_PRACTICE_SOURCE:
      return { ...state, source: action.payload.source };
    default:
      return state;
  }
};

export default practiceReducer;
