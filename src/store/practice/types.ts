import { SessionMedium, SessionSource, SessionType } from '../../utils/enums';

export const SET_PRACTICE_SESSION_TYPE = 'setPracticeSessionType';
export const SET_PRACTICE_MEDIUM = 'setPracticeMedium';
export const SET_PRACTICE_SOURCE = 'setPracticeSource';
export const SET_ALLOW_LIVE_FEEDBACK = 'setAllowLiveFeedback';

export type PracticeReduxState = {
  sessionType: SessionType;
  medium: SessionMedium;
  source: SessionSource;
  allowLiveFeedback: boolean;
};

export type PracticeReduxAction = {
  type:
    | typeof SET_PRACTICE_SESSION_TYPE
    | typeof SET_PRACTICE_MEDIUM
    | typeof SET_PRACTICE_SOURCE
    | typeof SET_ALLOW_LIVE_FEEDBACK;
  payload: {
    sessionType: SessionType;
    medium: SessionMedium;
    source: SessionSource;
    allowLiveFeedback: boolean;
  };
};
