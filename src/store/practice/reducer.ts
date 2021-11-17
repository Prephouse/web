import { Reducer } from 'redux';

import { SessionMedium, SessionOrigin, SessionType } from '../../utils/enums';

import {
  CLEAR_MEDIA_SOURCE,
  PracticeReduxAction,
  PracticeReduxState,
  SET_MEDIA_SOURCE,
  SET_PRACTICE_SETTINGS,
} from './types';

const initState: PracticeReduxState = {
  sessionType: SessionType.Interview,
  medium: SessionMedium.VideoAudio,
  origin: SessionOrigin.Record,
  allowLiveFeedback: true,
};

const practiceReducer: Reducer<PracticeReduxState, PracticeReduxAction> = (
  state = initState,
  action
) => {
  switch (action.type) {
    case SET_PRACTICE_SETTINGS:
      return {
        ...state,
        medium: action.payload.medium,
        origin: action.payload.origin,
        allowLiveFeedback: action.payload.allowLiveFeedback,
      };
    case SET_MEDIA_SOURCE:
      return { ...state, duration: action.payload.duration, source: action.payload.source };
    case CLEAR_MEDIA_SOURCE:
      return { ...state, duration: undefined, source: undefined };
    default:
      return state;
  }
};

export default practiceReducer;
