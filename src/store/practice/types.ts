import { SessionMedium, SessionOrigin, SessionType } from '../../utils/enums';

export const SET_PRACTICE_SETTINGS = 'setPracticeSettings';
export const SET_MEDIA_SOURCE = 'setMediaSource';
export const CLEAR_MEDIA_SOURCE = 'clearMediaSource';

export type PracticeReduxState = {
  sessionType: SessionType;
  medium: SessionMedium;
  origin: SessionOrigin;
  allowLiveFeedback: boolean;
  duration?: number | null;
  source?: string;
};

export type PracticeReduxAction = {
  type: typeof SET_PRACTICE_SETTINGS | typeof SET_MEDIA_SOURCE | typeof CLEAR_MEDIA_SOURCE;
  payload: {
    sessionType: SessionType;
    medium: SessionMedium;
    origin: SessionOrigin;
    allowLiveFeedback: boolean;
    duration: number | null;
    source: string;
  };
};
