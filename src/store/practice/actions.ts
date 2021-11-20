import { SessionMedium, SessionOrigin } from '../../utils/enums';

import { AppDispatch } from '../store';
import { SET_MEDIA_SOURCE, SET_PRACTICE_SETTINGS } from './types';

export const setPracticeSettings =
  (medium: SessionMedium, origin: SessionOrigin, allowLiveFeedback: boolean) =>
  (dispatch: AppDispatch) => {
    dispatch({
      type: SET_PRACTICE_SETTINGS,
      payload: { medium, origin, allowLiveFeedback },
    });
  };

export const setMediaSource = (source: string) => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_MEDIA_SOURCE,
    payload: { source },
  });
};

export const clearMediaSource = () => (dispatch: AppDispatch) => {
  dispatch({
    type: SET_MEDIA_SOURCE,
    payload: {},
  });
};
