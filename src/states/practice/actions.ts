import { createAction } from '@reduxjs/toolkit';

import { SessionMedium, SessionOrigin, SessionType } from './enums';

export const setPracticeSettings = createAction(
  'practice/setPracticeSettings',
  (medium: SessionMedium, origin: SessionOrigin, sessionType: SessionType) => ({
    payload: {
      medium,
      origin,
      sessionType,
    },
  })
);

export const setMediaSource = createAction<string>('practice/setMediaSource');

export const clearMediaSource = createAction<void>('practice/clearMediaSource');
